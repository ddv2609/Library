import { Button, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faBriefcase, faEnvelope, faLink, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";

import styles from "./DetailUserInfo.module.css";
import ItemUserInfo from "../ItemUserInfo/ItemUserInfo";

function DetailUserInfo({ editInfo, setEditInfo, userInfo, setUserInfo, handleSubmitEditInfo }) {
  const coupleItems = [
    [
      {
        id: "first-name",
        name: "firstName",
        required: true,
        label: (
          <>
            Họ <span className={styles.required}>*(yêu cầu)</span>
          </>
        ),
        type: "text",
        placeholder: "Họ",
      },
      {
        id: "last-name",
        name: "lastName",
        required: true,
        label: (
          <>
            Tên <span className={styles.required}>*(yêu cầu)</span>
          </>
        ),
        type: "text",
        placeholder: "Tên",
      }
    ],
    [
      {
        id: "birthday",
        name: "birthday",
        required: false,
        label: (
          <Space>
            <FontAwesomeIcon icon={faBirthdayCake} />
            Ngày sinh
          </Space>
        ),
        type: "date",
        placeholder: null,
      },
      {
        id: "telephone",
        name: "telephone",
        required: false,
        label: (
          <Space>
            <FontAwesomeIcon icon={faPhone} />
            Số điện thoại
          </Space>
        ),
        type: "tel",
        placeholder: "Số điện thoại",
      }
    ],
    [
      {
        id: "address",
        name: "address",
        required: false,
        label: (
          <Space>
            <FontAwesomeIcon icon={faLocationDot} />
            Địa chỉ
          </Space>
        ),
        type: "text",
        placeholder: "Địa chỉ",
      },
      {
        id: "email",
        name: "email",
        required: false,
        label: (
          <Space>
            <FontAwesomeIcon icon={faEnvelope} />
            Email
          </Space>
        ),
        type: "email",
        placeholder: "nguyenvana@gmail.com",
      }
    ],
    [
      {
        id: "job",
        name: "job",
        required: false,
        label: (
          <Space>
            <FontAwesomeIcon icon={faBriefcase} />
            Công việc
          </Space>
        ),
        type: "text",
        placeholder: "Công việc",
      },
      {
        id: "social-network",
        name: "socialNetwork",
        required: false,
        label: (
          <Space>
            <FontAwesomeIcon icon={faLink} />
            Liên kết mạng xã hội
          </Space>
        ),
        type: "url",
        placeholder: "Liên kết mạng xã hội",
      }
    ]
  ]

  const handleChangeInput = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
  }

  return (
    <div className={styles.detailInfo}>
      <h2>{`${userInfo.firstName || " "} ${userInfo.lastName || " "}`}</h2>
      <div className={styles.editInfo}>
        <Button
          className={styles.editInfoBtn}
          onClick={() => setEditInfo(true)}
        >
          Chỉnh sửa thông tin cá nhân
        </Button>
      </div>
      <form
        method="post"
        onSubmit={(e) => handleSubmitEditInfo(e)}
      >
        <div className={styles.infoWrapper}>
          {coupleItems.map(([itemSt, itemNd], index) => (
            <ItemUserInfo 
              key={index} 
              itemFirst={itemSt}
              itemSecond={itemNd}
              editInfo={editInfo}
              userInfo={userInfo}
              onChangeInput={handleChangeInput}
            />
          ))}
        </div>
        {editInfo ? (
          <div className={styles.save}>
            <Button 
              className={styles.saveBtn}
              htmlType="submit"
            >
              Lưu
            </Button>
          </div>
        ) : <></>}
      </form>
    </div>
  )
}

export default DetailUserInfo;