import clsx from "clsx";
import { Col, Dropdown, Space } from "antd";
import { useRef, useState } from "react";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Feature.module.css";

function Feature({ feature }) {
  const [caretDown, setCaretDown] = useState(true);
  const featureRef = useRef();

  return (
    <Col span={feature.span}>
      <div
        ref={featureRef}
        className={clsx([feature.style, styles.feature])}
        onClick={() => setCaretDown(!caretDown)}
      >
        <Dropdown
          menu={{ items: feature.items }}
          placement="bottom"
          trigger="click"
          onOpenChange={(open) => setCaretDown(!open)}
        >
          <Space>
            {feature.name}
            <FontAwesomeIcon icon={caretDown ? faCaretDown : faCaretUp} />
          </Space>
        </Dropdown>
      </div>
    </Col>
  )
}

export default Feature;