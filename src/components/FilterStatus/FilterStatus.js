import { Cascader, Col, Divider, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import styles from "./FilterStatus.module.css";

function FilterStatus({ title, options, value, handleCascader, handleFilter }) {
  return (
    <div className={styles.status}>
      <Divider className={styles.separate}>
        <h2 className={styles.headingSecond}>{title}</h2>
      </Divider>
      <Row align="middle" gutter={{ xs: 4, sm: 4, md: 6, lg: 12 }}>
        <Col xs={20} md={22}>
          <div className={styles.actionFilter}>
            <Cascader
              style={{
                width: '100%',
              }}
              options={options}
              multiple
              maxTagCount="responsive"
              showSearch
              showCheckedStrategy={Cascader.SHOW_CHILD}
              value={value}
              onChange={(values, options) => handleCascader(values, options)}
            ></Cascader>
          </div>
        </Col>
        <Col xs={4} md={2}>
          <div 
            className={styles.filterBtn}
            onClick={handleFilter}
          >
            <FontAwesomeIcon icon={faFilter} className={styles.iconFilter} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default FilterStatus;