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
          key: '1',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Adventure fiction</div>
          )
        },
        {
          type: 'divider'
        },
        {
          key: '2',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Allegorical fiction</div>
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
            >Biography</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '4',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Classics</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '5',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Crime</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '6',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Coming-of-age fiction</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '7',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Detective fiction</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '8',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Dystopian</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '9',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Epic poetry</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '10',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Fantasy</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '11',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Gothic novel</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '12',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Historical fiction</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '13',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Historical novel</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '14',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Holocaust fiction</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '15',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Horror</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '16',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Literary fiction</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '17',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Magic realism</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '18',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Modernist novel</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '19',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Mystery</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '20',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Philosophical fiction</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '21',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Poetry</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '22',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Post-apocalyptic fiction</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '23',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Psychological fiction</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '24',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Realistic fiction</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '25',
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
          key: '26',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Science fiction</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '27',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >War</div>
          ),
        },
        {
          type: 'divider'
        },
        {
          key: '28',
          label: (
            <div
              className={styles.choice}
              name="Thể loại"
              onClick={(e) => handleSetStatus(e)}
            >Young adult fiction</div>
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