import { Col, Divider, Dropdown, Row, Skeleton } from "antd";
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SendOutlined } from "@ant-design/icons";
import { forwardRef, useImperativeHandle, useRef } from "react";
import clsx from "clsx";

import styles from "./Comment.module.css";

function Comment({
  comments = [], loading,
  commentContent, setActionWithComment,
  onEnterComment, onSendComment, onDeleteComment, onEditComment },
  commentRef) {
  const inputCommentRef = useRef();
  const wrapRef = useRef();

  const actions = [
    {
      key: '0',
      label: (
        <div
          className={styles.edit}
          onClick={onEditComment}
        >
          <EditOutlined className={styles.iconEdit} />
          <span className={styles.actionText}>Chỉnh sửa</span>
        </div>
      )
    },
    {
      key: '1',
      label: (
        <div
          className={styles.delete}
          onClick={onDeleteComment}
        >
          <DeleteOutlined />
          <span className={styles.actionText}>Xóa bình luận</span>
        </div>
      )
    }
  ]

  useImperativeHandle(commentRef, () => (
    {
      focusComment() {
        inputCommentRef.current.focus();
      },
      scrollIntoView() {
        wrapRef.current.scrollIntoView(
          localStorage.getItem("uid") ? {
            block: "end",
            behavior: "smooth"
          } : {
            block: "start",
            behavior: "smooth"
          }
        )
      },
      cancelDisabled() {
        inputCommentRef.current.disabled = false;
      }
    }
  ))

return (
  <div ref={wrapRef} >
    <div className={styles.comments} ref={commentRef}>
      <div className={styles.commentsWrap} >
        <Divider orientation="left" className={styles.separate}>Bình luận ({comments.length})</Divider>
        <ul className={styles.unorderList}>
          {comments.length > 0 ? comments.map((comment, index) => (
            <li key={index} className={styles.list}>
              <Row>
                <Col xs={3} sm={2} md={2} lg={1}>
                  <div className={styles.avatar}>
                    <img src={comment.avatar || "/avatar.png"} alt="Avatar" className={styles.image} />
                  </div>
                </Col>
                <Col xs={21} sm={22} md={22} lg={23}>
                  <div className={styles.comment} time={comment.commentTime}>
                    <div className={styles.contentWrap}>
                      <div className={styles.username}>
                        <h6 className={styles.headingSixth}>{comment.name}</h6>
                      </div>
                      <div className={styles.content}>
                        <p className={styles.paragraph}>{comment.comment}</p>
                      </div>
                    </div>
                    {localStorage.getItem("uid") === comment.uid ? (
                      <Dropdown
                        menu={{ items: actions }}
                        trigger={['click']}
                        arrow={{ pointAtCenter: true }}
                        placement="bottom"
                        onClick={() => setActionWithComment({
                          contentID: comment.contentID,
                          comment: comment.comment
                        })}
                      >
                        <div className={styles.actions}>
                          <EllipsisOutlined className={styles.ellipsis} />
                        </div>
                      </Dropdown>
                    ) : (<></>)}
                  </div>
                </Col>
              </Row>
            </li>
          )) : (
            loading ? (
              [...Array(3)].map((_, index) => (
                <li key={index} className={styles.list}>
                  <Skeleton active avatar />
                </li>
              ))
            ) : (
              <div className={styles.noComment}>
                <p className={styles.paragraph}>Hiện tại chưa có bình luận nào</p>
                <p className={styles.paragraph}>Bạn hãy trở thành người bình luận đầu tiên nhé!</p>
              </div>
            )
          )}
        </ul>
      </div>
      {localStorage.getItem("uid") && (
        <div className={styles.enterComment}>
          <Row align="middle">
            <Col xs={21} sm={22} lg={23}>
              <div>
                <textarea
                  ref={inputCommentRef}
                  className={styles.fieldComment}
                  rows={3}
                  placeholder="Viết bình luận..."
                  value={commentContent}
                  onChange={(e) => onEnterComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (commentContent !== "") {
                        inputCommentRef.current.disabled = true
                      }
                      onSendComment();
                    }
                  }}
                ></textarea>
              </div>
            </Col>
            <Col xs={3} sm={2} lg={1}>
              <div
                className={clsx([styles.send, (commentContent.trim() === "" ? styles.disabled : "")])}
                title={commentContent.trim() === "" ? "Bạn cần viết bình luận mới có thể gửi" : "Bình luận"}
                onClick={onSendComment}
              >
                <SendOutlined className={styles.iconSend} />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  </div>
)
}

export default forwardRef(Comment);