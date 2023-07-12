import { Button, Col, Divider, Input, Row, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";
import clsx from "clsx";

import styles from "./BillInfo.module.css";

function BillInfo({ hasChecks, display, standardizeMoney }) {
  
  const deliveryCharges = useMemo(() => {
    if (hasChecks.length > 0) {
      let charge = 10000 + 3000 * hasChecks.length;
      return charge;
    }
    return 0;
  }, [hasChecks])

  const totalMoney = useMemo(() => {
    let purchase = hasChecks.reduce((total, book) => (
      total + book.quantity * book.price * (1 - book.saleOff)
    ), 0);
    return purchase;
  }, [hasChecks])

  return (
    <div className={clsx([styles.billInfo, styles[display]])}>
      <div className={styles.address}>
        <p className={styles.title}>Địa điểm</p>
        <div className={styles.specificAddress}>
          <Space align="center" size={12}>
            <FontAwesomeIcon icon={faLocationDot} className={styles.iconLocationDot} />
            Khương Đình, Thanh Xuân, Hà Nội
          </Space>
        </div>
      </div>
      <Divider className={styles.separate}></Divider>
      <div className={styles.info}>
        <h3 className={styles.headingThrid}>Thông tin đơn hàng</h3>
        <Row align="middle" justify="space-between">
          <Col span={16}>
            <p className={styles.title}>Tạm tính ({hasChecks.length || 0} sản phẩm)</p>
          </Col>
          <Col span={8}>
            <p className={styles.money}>{standardizeMoney(totalMoney.toString())} vnđ</p>
          </Col>
        </Row>
        <div className={styles.listItems}>
          {hasChecks.map((book, index) => (
            <div key={index} className={styles.item}>
              <Divider className={styles.separate}></Divider>
              <Row align="middle" justify="space-between">
                <Col span={16}>
                  <p className={styles.title}>
                    <span className={styles.bookName} title={book.title}>{book.title} </span>
                    <span>({book.quantity} quyển)</span>
                  </p>
                </Col>
                <Col span={8}>
                  <p className={styles.money}>
                    {standardizeMoney(Number(book.quantity * book.price * (1 - book.saleOff)).toString())} vnđ
                  </p>
                </Col>
              </Row>
            </div>
          ))}
        </div>
        <Row align="middle" justify="space-between">
          <Col span={16}>
            <p className={styles.title}>Phí giao hàng</p>
          </Col>
          <Col span={8}>
            <p className={styles.money}>{standardizeMoney(deliveryCharges.toString())} vnđ</p>
          </Col>
        </Row>
      </div>
      <div className={styles.codeSale}>
        <Row align="middle" justify="space-around">
          <Col xs={16} lg={16} xl={18}>
            <div className={styles.enterCode}>
              <Input
                placeholder="Mã giảm giá (mã chỉ áp dụng 1 lần)"
                title="Mã giảm giá (mã chỉ áp dụng 1 lần)"
              />
            </div>
          </Col>
          <Col xs={8} lg={8} xl={6}>
            <Button className={styles.applyBtn}>ÁP DỤNG</Button>
          </Col>
        </Row>
      </div>
      <div>
        <Row align="middle" justify="space-around">
          <Col span={16}>
            <p><strong>Tổng cộng</strong></p>
          </Col>
          <Col span={8}>
            <p className={styles.totalMoney}>
              {standardizeMoney((totalMoney + deliveryCharges).toString())} vnđ
            </p>
          </Col>
        </Row>
        <p className={styles.vat}>Đã bao gồm VAT (nếu có)</p>
      </div>
      <Button
        className={clsx([styles.comfirmBtn, hasChecks.length > 0 ? false : styles.disabled])}
        title={hasChecks.length > 0 ? "" : "Bạn cần chọn ít nhất một sản phẩm trong giỏ hàng để thực hiện mua hàng"}
        disabled={hasChecks.length > 0 ? false : true}
      >
        XÁC NHẬN GIỎ HÀNG
      </Button>
    </div>
  )
}

export default BillInfo;