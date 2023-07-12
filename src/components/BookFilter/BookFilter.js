import { Col, Divider, Row } from "antd";

import styles from "./BookFilter.module.css";
import Feature from "../Feature/Feature";

function BookFilter({ setOptions }) {
  const [setCategory, setReleaseDate, setRate, setSold, setSaleOff, setPrice] = setOptions;

  const handleSetStatus = (e) => {
    let title = e.target.getAttribute("name");
    let label = `${title}: ${e.target.innerText}`;
    switch (title) {
      case "Thể loại":
        setCategory(prev => ({...prev, label}))
        break;
      case "Năm phát hành":
        setReleaseDate(prev => ({...prev, label}))
        break;
      case "Đánh giá":
        setRate(prev => ({...prev, label}))
        break;
      case "Đã bán":
        setSold(prev => ({...prev, label}))
        break;
      case "Ưu đãi":
        setSaleOff(prev => ({...prev, label}))
        break;
      case "Giá thành":
        setPrice(prev => ({...prev, label}))
        break;
      default:
        break;
    }
  }

  const filterFeatures = [
    {
      name: "Thể loại",
      style: styles.category,
      span: 8,
      items: [
        {
          key: '2',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Romance</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '3',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Comedy</div>
          ),
        }
      ]
    },
    {
      name: "Phát hành",
      style: styles.releaseDate,
      span: 8,
      items: [
        {
          key: '1',
          label: (
            <div
              className={styles.choice}
              name="Năm phát hành"
              onClick={(e) => handleSetStatus(e)}
            >2022</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '2',
          label: (
            <div
              className={styles.choice}
              name="Năm phát hành"
              onClick={(e) => handleSetStatus(e)}
            >2023</div>
          ),
        }
      ]
    }
  ]

  const sortFeatures = [
    {
      name: "Đánh giá",
      style: styles.rate,
      span: 5,
      items: [
        {
          key: '1',
          label: (
            <div
              className={styles.choice}
              name="Đánh giá"
              onClick={(e) => handleSetStatus(e)}
            >Số sao tăng dần</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '2',
          label: (
            <div
              className={styles.choice}
              name="Đánh giá"
              onClick={(e) => handleSetStatus(e)}
            >Số sao giảm dần</div>
          ),
        }
      ]
    },
    {
      name: "Đã bán",
      style: styles.quantitySold,
      span: 5,
      items: [
        {
          key: '1',
          label: (
            <div
              className={styles.choice}
              name="Đã bán"
              onClick={(e) => handleSetStatus(e)}
            >Số lượng tăng dần</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '2',
          label: (
            <div
              className={styles.choice}
              name="Đã bán"
              onClick={(e) => handleSetStatus(e)}
            >Số lượng giảm dần</div>
          ),
        }
      ]
    },
    {
      name: "Ưu đãi",
      style: styles.saleOff,
      span: 5,
      items: [
        {
          key: '1',
          label: (
            <div
              className={styles.choice}
              name="Ưu đãi"
              onClick={(e) => handleSetStatus(e)}
            >Ưu đãi tăng dần</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '2',
          label: (
            <div
              className={styles.choice}
              name="Ưu đãi"
              onClick={(e) => handleSetStatus(e)}
            >Ưu đãi giảm dần</div>
          ),
        }
      ]
    },
    {
      name: "Giá thành",
      style: styles.price,
      span: 5,
      items: [
        {
          key: '1',
          label: (
            <div
              className={styles.choice}
              name="Giá thành"
              onClick={(e) => handleSetStatus(e)}
            >Giá thành tăng dần</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '2',
          label: (
            <div
              className={styles.choice}
              name="Giá thành"
              onClick={(e) => handleSetStatus(e)}
            >Giá thành giảm dần</div>
          ),
        }
      ]
    }
  ]

  return (
    <div className={styles.bookFilter}>
      <Row>
        <Col span={9}>
          <div className={styles.filter}>
            <Divider className={styles.separate}>
              <h2 className={styles.headingSecond}>Lọc sách</h2>
            </Divider>
            <div className={styles.features}>
              <Row justify="space-evenly">
                {filterFeatures.map((filter, index) => (
                  <Feature feature={filter} key={index} />
                ))}
              </Row>
            </div>
          </div>
        </Col>
        <Col span={15}>
          <div className={styles.sort}>
            <Divider className={styles.separate}>
              <h2 className={styles.headingSecond}>Sắp xếp</h2>
            </Divider>
            <div className={styles.features}>
              <Row justify="space-evenly">
                {sortFeatures.map((sort, index) => (
                  <Feature feature={sort} key={index} />
                ))}
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default BookFilter;