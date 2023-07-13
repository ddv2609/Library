import { Button, Dropdown, Modal, Progress, Skeleton, Space, Upload, message } from "antd";
import { useEffect, useState } from "react";
import storage, { auth } from "../../configs";
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from "firebase/storage";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { signIn } from "../../actions";
import { onAuthStateChanged } from "firebase/auth";

import styles from "./UserInfo.module.css";
import Error404 from "../../components/Error/Error404";
import DetailUserInfo from "../../components/DetailUserInfo/DetailUserInfo";

function UserInfo() {
  const [imageUrl, setImageUrl] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [upload, setUpLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [openPreview, setOpenPreview] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const dispatch = useDispatch();

  const editOptions = [
    {
      key: "0",
      label: (
        <div
          onClick={() => setOpenDropdown(false)}
        >
          Cập nhật avatar
        </div>
      )
    },
    {
      key: "2",
      label: (
        <div
          onClick={(e) => {
            e.stopPropagation();
            deleteAvatar()
              .then((_) => {
                setOpenDropdown(false);
                // setEdit(false);
                setImageUrl();
                setUpLoad(false);
              })
          }}
        >
          Xóa avatar
        </div>
      )
    }
  ]

  const beforeUpload = (file) => {
    if (!file.type.match(/image.*/)) {
      message.error("Bạn chỉ có thể tải file ảnh nên!");
    } else {
      setUpLoad(true);
    }
    setOpenDropdown(false);
  }

  const uploadImageToFirebase = (file) => {
    const storageRef = ref(storage, `/avatars/${localStorage.getItem("uid")}/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);


    deleteAvatar()
      .then((_) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            // update progress
            setPercent(percent);
          },
          (err) => console.error(`Error when trying upload avatar: ${err}`),
          () => {

            // download url
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                const uid = localStorage.getItem("uid");
                fetch(`https://library-db-vercel.vercel.app/users/${uid}`, {
                  method: "PATCH",
                  mode: "cors",
                  body: JSON.stringify({ avatar: url }),
                  headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                  }
                })
                  .then(res => res.json())
                  .then(user => {
                    dispatch(signIn({
                      ...user,
                      id: uid
                    }));
                    setUserInfo(user);
                    setUpLoad(false);
                    message.success("Ảnh đại diện của bạn đã được thay đổi!");
                  })
                  .catch(err => {
                    message.error("Xảy ra lỗi trong quá trình cập nhật ảnh đại diện");
                    console.error(`Error when trying upload user avatar: ${err}`)
                  })
                // setEdit(false);
              })
              .then(() => setPercent(0))
          }
        );
      })
      .catch((err) => {
        message.error("Xảy ra lỗi trong quá trình cập nhật ảnh đại diện");
        console.error(`Error when trying list all avatar images: ${err}`)
      })
  }

  const deleteAvatar = async () => {
    const storageFolderRef = ref(storage, `/avatars/${localStorage.getItem("uid")}`);
    const response = await listAll(storageFolderRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          deleteObject(itemRef)
            .then(() => {
              const uid = localStorage.getItem("uid");
              fetch(`https://library-db-vercel.vercel.app/users/${uid}`, {
                method: "PATCH",
                mode: "cors",
                body: JSON.stringify({ avatar: null }),
                headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
                }
              })
                .then(res => res.json())
                .then(user => {
                  dispatch(signIn({
                    ...user,
                    id: uid
                  }));
                  setUserInfo(user);
                  message.success("Ảnh đại diện của bạn đã được xóa!");
                })
                .catch(err => console.error(`Error when trying delete user avatar: ${err}`))
            })
            .catch((err) => console.error(`Error when trying delete old avatar images: ${err}`))
        })
      })
    return response;
  }

  const handleCancelPreview = () => {
    setOpenPreview(false)
  }

  const handleOpenPreviewAvatar = () => {
    setOpenPreview(true)
  }

  const handleSubmitEditInfo = (e) => {
    e.preventDefault();
    const newUser = { ...userInfo };
    const uid = localStorage.getItem("uid");
    fetch(`https://library-db-vercel.vercel.app/users/${uid}`, {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })
      .then(res => res.json())
      .then(user => {
        dispatch(signIn({
          ...user,
          uid
        }));
        message.success("Thông tin cá nhân đã được sửa đổi!")
      })
      .catch(err => console.error(`Error when trying get user info: ${err}`))
    setEditInfo(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Thông tin cá nhân";

    return () => {
      document.title = "Library";
    }
  }, [])

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    fetch(`https://library-db-vercel.vercel.app/users/${uid}`)
      .then(res => res.json())
      .then(user => {
        onAuthStateChanged(auth, (info) => {
          if (info) {
            setUserInfo({ ...user, email: info.email });
            setLoading(false);
          }
        })
        // setUserInfo({...user, email: auth.currentUser?.email});
        // setLoading(false);
      })
      .catch(err => console.error(`Error when trying get user info: ${err}`))
  }, [])

  return (
    <>
      {localStorage.getItem("uid") ? (
        <div className={clsx([styles.userInfo, "container"])}>
          <div className={styles.avatar}>
            <Upload
              name="avatar"
              listType="picture-circle"
              className={styles.avatarUploader}
              accept="image/*"
              maxCount={1}
              showUploadList={false}
              action={(file) => uploadImageToFirebase(file)}
              beforeUpload={beforeUpload}
              disabled={!openDropdown}
            >
              <div className={styles.uploadWrapper}>
                {(loading || userInfo.avatar) && !upload ? (
                  <div
                    className={styles.avatarUpload}
                    onClick={handleOpenPreviewAvatar}
                  >
                    {userInfo.avatar ? (
                      <>
                        <img src={userInfo.avatar} alt="avatar" className={styles.newAvatar} />
                        <EyeOutlined className={styles.iconEye} />
                      </>
                    ) : (
                      <Skeleton.Image className={styles.newAvatar} active></Skeleton.Image>
                    )}
                  </div>
                ) : (
                  <div>
                    {upload ? (
                      <>
                        <Progress
                          strokeLinecap="butt"
                          type="circle"
                          status="normal"
                          percent={percent}
                          size={82}
                        />
                      </>
                    ) : (
                      <div
                        className={styles.avatarUpload}
                        onClick={handleOpenPreviewAvatar}
                      >
                        <img src="/avatar.png" alt="Upload" className={styles.oldAvatar} />
                        <EyeOutlined className={styles.iconEye} />
                      </div>
                    )}
                  </div>
                )}
                <Dropdown
                  menu={{ items: editOptions }}
                  open={openDropdown}
                  trigger="click"
                  onOpenChange={(open) => setOpenDropdown(open)}
                >
                  <Button className={styles.editBtn}
                    onClick={() => setOpenDropdown(true)}
                  >
                    <Space >
                      <EditOutlined className={styles.editIcon} />
                      Edit
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            </Upload>
          </div>
          <Modal
            open={openPreview}
            footer={null}
            onCancel={handleCancelPreview}
            style={{ top: "32px" }}
          >
            <img
              alt="Avatar"
              className={styles.avatarPreview}
              src={userInfo.avatar || "/avatar.png"}
            />
          </Modal>
          <DetailUserInfo
            editInfo={editInfo}
            setEditInfo={setEditInfo}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            handleSubmitEditInfo={handleSubmitEditInfo}
          />
        </div>
      ) : <Error404 />}
    </>
  )
}

export default UserInfo;