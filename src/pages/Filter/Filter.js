import clsx from "clsx";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCascaderOptions, changeCascaderSmallerValues, changeCascaderValues,
  changePage, changeQuery, changeSearch, changeSorts, getAllBooks
} from "../../actions";

import styles from "./Filter.module.css";
import Error404 from "../../components/Error/Error404";
import FilterStatus from "../../components/FilterStatus/FilterStatus";
import BooksList from "../../components/BooksList/BooksList";
import BookFilter from "../../components/BookFilter/BookFilter";
import Search from "antd/es/input/Search";
import { getBooksByParams } from "../../services";

function Filter() {
  const dispatch = useDispatch();
  const books = useSelector(state => state.booksReducer);
  const query = useSelector(state => state.queryReducer);
  const page = useSelector(state => state.pageReducer);
  const sorts = useSelector(state => state.sortsReducer);
  const options = useSelector(state => state.cascaderOptionsReducer);
  const value = useSelector(state => state.cascaderValuesReducer);
  const smallerValue = useSelector(state => state.cascaderSmallerValuesReducer);
  const search = useSelector(state => state.searchReducer);

  const [checkFilter, setCheckFilter] = useState(false);
  const [category, setCategory] = useState({ label: "", value: "category" })
  const [releaseDate, setReleaseDate] = useState({ label: "", value: "releaseDate" })
  const [rate, setRate] = useState({ label: "", value: "rate" })
  const [sold, setSold] = useState({ label: "", value: "quantitySold" })
  const [saleOff, setSaleOff] = useState({ label: "", value: "saleOff" })
  const [price, setPrice] = useState({ label: "", value: "price" })

  const [searchInput, setSearchInput] = useState(search);
  const [loading, setLoading] = useState(true);

  const limit = 24;

  const [changeUI, setChangeUI] = useState(parseInt(window.innerWidth) > 991.98 ? false : true);

  const smallerOptions = [
    {
      label: "Thể loại",
      value: "category",
      children: [
        {
          label: "Adventure fiction",
          value: "Adventure fiction"
        },
        {
          label: "Allegorical fiction",
          value: "Allegorical fiction"
        },
        {
          label: "Biography",
          value: "Biography"
        },
        {
          label: "Classics",
          value: "Classics"
        },
        {
          label: "Crime",
          value: "Crime"
        },
        {
          label: "Coming-of-age fiction",
          value: "Coming-of-age fiction"
        },
        {
          label: "Detective fiction",
          value: "Detective fiction"
        },
        {
          label: "Dystopian",
          value: "Dystopian"
        },
        {
          label: "Epic poetry",
          value: "Epic poetry"
        },
        {
          label: "Fantasy",
          value: "Fantasy"
        },
        {
          label: "Gothic novel",
          value: "Gothic novel"
        },
        {
          label: "Historical fiction",
          value: "Historical fiction"
        },
        {
          label: "Historical novel",
          value: "Historical novel"
        },
        {
          label: "Holocaust fiction",
          value: "Holocaust fiction"
        },
        {
          label: "Horror",
          value: "Horror"
        },
        {
          label: "Literary fiction",
          value: "Literary fiction"
        },
        {
          label: "Magic realism",
          value: "Magic realism"
        },
        {
          label: "Modernist novel",
          value: "Modernist novel"
        },
        {
          label: "Mystery",
          value: "Mystery"
        },
        {
          label: "Philosophical fiction",
          value: "Philosophical fiction"
        },
        {
          label: "Poetry",
          value: "Poetry"
        },
        {
          label: "Post-apocalyptic fiction",
          value: "Post-apocalyptic fiction"
        },
        {
          label: "Psychological fiction",
          value: "Psychological fiction"
        },
        {
          label: "Realistic fiction",
          value: "Realistic fiction"
        },
        {
          label: "Romance",
          value: "Romance"
        },
        {
          label: "Science fiction",
          value: "Science fiction"
        },
        {
          label: "War",
          value: "War"
        },
        {
          label: "Young adult fiction",
          value: "Young adult fiction"
        }
      ]
    },
    {
      label: "Phát hành",
      value: "releaseDate",
      children: [
        {
          label: "2022",
          value: "2022"
        },
        {
          label: "2023",
          value: "2023"
        }
      ]
    },
    {
      label: "Đánh giá",
      value: "rate",
      children: [
        {
          label: "Số sao tăng dần",
          value: "increase"
        },
        {
          label: "Số sao giảm dần",
          value: "decrease"
        }
      ]
    },
    {
      label: "Đã bán",
      value: "quantitySold",
      children: [
        {
          label: "Số lượng tăng dần",
          value: "increase"
        },
        {
          label: "Số lượng giảm dần",
          value: "decrease"
        }
      ]
    },
    {
      label: "Ưu đãi",
      value: "saleOff",
      children: [
        {
          label: "Ưu đãi tăng dần",
          value: "increase"
        },
        {
          label: "Ưu đãi giảm dần",
          value: "decrease"
        }
      ]
    },
    {
      label: "Giá thành",
      value: "price",
      children: [
        {
          label: "Giá thành tăng dần",
          value: "increase"
        },
        {
          label: "Giá thành giảm dần",
          value: "decrease"
        }
      ]
    }
  ]

  useEffect(() => {
    if (books.length > 0) {
      const offsetY = localStorage.getItem("offsetY");
      if (offsetY) {
        window.scrollTo({
          top: offsetY,
          left: 0,
          behavior: "smooth"
        });
      } else {
        window.scrollTo(0, 0);
      }
      localStorage.removeItem("offsetY")
    }
  }, [])

  useEffect(() => {
    const opts = [];
    const values = [category, releaseDate, rate, sold, saleOff, price].reduce((arrs, option) => {
      if (option.label !== "") {
        opts.push(option);
        return [...arrs, [option.value]];
      }
      return arrs;
    }, [])
    if (opts.length > 0 && values.length > 0) {
      dispatch(changeCascaderOptions(opts));
      dispatch(changeCascaderValues(values));
    }
  }, [category, releaseDate, rate, sold, saleOff, price])

  useEffect(() => {
    const handleResizeWindow = () => {
      let width = parseInt(window.innerWidth);
      if (width <= 991.98 && !changeUI) {
        setChangeUI(true);
      } else {
        if (width > 991.98 && changeUI) {
          setChangeUI(false);
        }
      }
    }

    document.title = "Trang lọc sách";

    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
      document.title = "Library";
    }
  }, [changeUI])

  const calculateRating = (stars, votes) => {
    let average = Number(stars / votes);
    let round = Number(average.toFixed(0));
    if (average <= round) {
      return round;
    } else {
      return round + 0.5;
    }
  }

  useEffect(() => {
    const compare = (bookFirst, bookSecond) => {
      const rateFirst = calculateRating(bookFirst.stars, bookFirst.votes);
      const rateSecond = calculateRating(bookSecond.stars, bookSecond.votes);
      for (let i = 0, len = sorts.length; i < len; i++) {
        switch (sorts[i][0]) {
          case "rate":
            if (rateFirst !== rateSecond) {
              return sorts[i][1] === "asc" ? (rateFirst < rateSecond ? -1 : 1) : (rateFirst < rateSecond ? 1 : -1);
            }
            break;
          case "quantitySold":
            if (bookFirst.quantitySold !== bookSecond.quantitySold) {
              return sorts[i][1] === "asc" ? (bookFirst.quantitySold < bookSecond.quantitySold ? -1 : 1) : (bookFirst.quantitySold < bookSecond.quantitySold ? 1 : -1);
            }
            break;
          case "saleOff":
            if (bookFirst.saleOff !== bookSecond.saleOff) {
              return sorts[i][1] === "asc" ? (bookFirst.saleOff < bookSecond.saleOff ? -1 : 1) : (bookFirst.saleOff < bookSecond.saleOff ? 1 : -1);
            }
            break;
          case "price":
            if (bookFirst.price !== bookSecond.price) {
              return sorts[i][1] === "asc" ? (bookFirst.price < bookSecond.price ? -1 : 1) : (bookFirst.price < bookSecond.price ? 1 : -1);
            }
            break;
          default:
            break;
        }
      }
      return 0;
    }

    let params = `q=${search}` + (query !== "" ? `&${query}` : query);

    getBooksByParams(params)
      .then(books => {
        if (sorts.length > 0) {
          books.sort(compare);
        }
        dispatch(getAllBooks(books));
        if (checkFilter) {
          dispatch(changePage(1));
          setCheckFilter(false);
        }
        setLoading(books.length > 0);
      })
  }, [query, sorts, search])

  const handleFilter = () => {
    let queryString = "";
    let newSorts = [];
    if (!changeUI) {
      options.forEach(({ label, value }) => {
        let category = label.split(": ")[1];
        let param = category.charAt(0).toUpperCase() + category.slice(1);
        switch (value) {
          case "category":
            queryString += queryString !== "" ? `&category=${param}` : `category=${param}`;
            break;
          case "releaseDate":
            queryString += queryString !== "" ? `&releaseDate_like=${param}` : `releaseDate_like=${param}`;
            break;
          case "rate":
            newSorts.push([value, param.includes("tăng") ? "asc" : "desc"]);
            break;
          case "quantitySold":
            newSorts.push([value, param.includes("tăng") ? "asc" : "desc"]);
            break;
          case "saleOff":
            newSorts.push([value, param.includes("tăng") ? "asc" : "desc"]);
            break;
          case "price":
            newSorts.push([value, param.includes("tăng") ? "asc" : "desc"]);
            break;
          default:
            break;
        }
      })
    } else {
      smallerValue.forEach(([value, label]) => {
        let param = label.charAt(0).toUpperCase() + label.slice(1);
        switch (value) {
          case "category":
            queryString += queryString !== "" ? `&category=${param}` : `category=${param}`;
            break;
          case "releaseDate":
            queryString += queryString !== "" ? `&releaseDate_like=${param}` : `releaseDate_like=${param}`;
            break;
          case "rate":
            newSorts.push([value, label === "increase" ? "asc" : "desc"]);
            break;
          case "quantitySold":
            newSorts.push([value, label === "increase" ? "asc" : "desc"]);
            break;
          case "saleOff":
            newSorts.push([value, label === "increase" ? "asc" : "desc"]);
            break;
          case "price":
            newSorts.push([value, label === "increase" ? "asc" : "desc"]);
            break;
          default:
            break;
        }
      })
    }
    dispatch(changeSorts(newSorts));
    dispatch(changeQuery(queryString));
    setCheckFilter(true);
  }

  const handleDeleteItemCascader = (values, options) => {
    const valuesStr = values.map(([value]) => value);
    [{ option: category, setOption: setCategory }, { option: releaseDate, setOption: setReleaseDate },
    { option: rate, setOption: setRate }, { option: sold, setOption: setSold },
    { option: saleOff, setOption: setSaleOff }, { option: price, setOption: setPrice }].forEach(({ option, setOption }) => {
      if (!valuesStr.includes(option.value)) {
        setOption({ label: "", value: option.value })
      }
    })
    const opts = options.map(([option]) => option);
    dispatch(changeCascaderOptions(opts));
    dispatch(changeCascaderValues(values));
  }

  const handleDeleteItemSmallerCascader = (values, _) => {
    const valuesSet = [];
    const newSmallerValue = values.reverse().reduce((arr, value) => {
      if (!valuesSet.includes(value[0])) {
        valuesSet.push(value[0]);
        return [...arr, value];
      }
      return arr;
    }, [])
    dispatch(changeCascaderSmallerValues(newSmallerValue));
  }

  const handleChangePage = (page) => {
    dispatch(changePage(page));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  const handleSearch = (search) => {
    const standardized = search.trim();
    if (standardized !== "") {
      dispatch(changeSearch(standardized));
    } else {
      if (search !== " ")
        dispatch(changeSearch(" "));
    }
  }

  return (
    <>
      <div className={clsx([styles.filterBooks, "container"])}>
        {!changeUI ? (
          <>
            <BookFilter
              setOptions={[setCategory, setReleaseDate, setRate, setSold, setSaleOff, setPrice]}
            />
            <FilterStatus
              title={"Trạng thái"}
              options={options}
              value={value}
              handleCascader={handleDeleteItemCascader}
              handleFilter={handleFilter}
            />
          </>
        ) : (
          <>
            <Search
              className={styles.search}
              addonBefore="Tìm kiếm"
              placeholder="Tìm kiếm tên sách / tác giả"
              allowClear
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onSearch={(text) => handleSearch(text)}
            />
            <FilterStatus
              title={"Bộ lọc"}
              options={smallerOptions}
              value={smallerValue}
              handleCascader={(values, options) => handleDeleteItemSmallerCascader(values, options)}
              handleFilter={handleFilter}
            />
          </>
        )}
        <div className={styles.books}>
          <BooksList
            books={books.slice((page - 1) * 24, page * 24)}
            loading={loading}
          />
        </div>
        <div className={styles.pagination}>
          <Pagination
            defaultCurrent={1}
            current={page}
            total={books.length}
            pageSize={limit}
            hideOnSinglePage
            responsive
            showSizeChanger={false}
            showQuickJumper
            onChange={(page) => handleChangePage(page)}
          />
        </div>
      </div>
    </>
  )
}

export default Filter;