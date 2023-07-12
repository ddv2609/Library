import { Col, Row } from "antd";

import styles from "./ItemUserInfo.module.css";

function ItemUserInfo({ itemFirst, itemSecond, editInfo, userInfo, onChangeInput }) {
  return (
    <div className={styles.component}>
      <Row align="middle" justify="space-evenly" gutter={[0, 32]}>
        <Col xs={22} sm={20} md={16} lg={8}>
          <div className={styles[itemFirst.name]}>
            <label className={styles.label} htmlFor={itemFirst.id}>{itemFirst.label}</label>
            <input id={itemFirst.id} className={styles.input}
              type={itemFirst.type} placeholder={itemFirst.placeholder} name={itemFirst.name}
              value={userInfo[itemFirst.name] || ""} disabled={!editInfo} required={itemFirst.required}
              onChange={(e) => onChangeInput(e)}
            />
          </div>
        </Col>
        <Col xs={22} sm={20} md={16} lg={8}>
          <div className={styles[itemSecond.name]}>
            <label className={styles.label} htmlFor={itemSecond.id}>{itemSecond.label}</label>
            {itemSecond.name === "email" ? (
              <input id={itemSecond.id} className={styles.input}
                title="Không được phép chỉnh sửa email"
                type={itemSecond.type} placeholder={itemSecond.placeholder} name={itemSecond.name}
                value={userInfo[itemSecond.name] || ""} disabled
                onChange={(e) => onChangeInput(e)}
              />
            ) : (
              <input id={itemSecond.id} className={styles.input}
                type={itemSecond.type} placeholder={itemSecond.placeholder} name={itemSecond.name}
                value={userInfo[itemSecond.name] || ""} disabled={!editInfo} required={itemSecond.required}
                onChange={(e) => onChangeInput(e)}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ItemUserInfo;