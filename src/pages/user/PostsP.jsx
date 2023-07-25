import { Input } from "antd";
import "./posts.css";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINT, PAGE_LIMIT } from "../../const";
import Loading from "../../components/Loading";
import PostsCard from "../../components/PostsCard";
import Free from "../../components/Free";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Pagination } from "react-bootstrap";

const PostsP = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // let { signal, abort } = new AbortController()
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${ENDPOINT}/post?search=${search}&page=${page}&limit=${PAGE_LIMIT}`
        );
        setData(data.data);
        setTotal(data.pagination.total);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
    document.querySelector("head title").textContent = "Najot News || POSTS";
    // return () => {
    //   abort()
    // };
  }, [search, page]);

  const handleSearch = (e) => {
    setPage(1);
    setSearch(e.target.value);
  };

  const getPage = (key) => {
    setPage(key);
  };

  const items = [];
  for (let i = 1; i <= Math.ceil(total / PAGE_LIMIT); i++) {
    items.push(
      <Pagination.Item key={i} onClick={() => getPage(i)} active={i === page}>
        {i}
      </Pagination.Item>
    );
  }

  let pagination = total > PAGE_LIMIT && <Pagination>{items}</Pagination>;

  return (
    <section className="container">
      <div className="container posts_search_text">
        <Search
          value={search}
          onChange={handleSearch}
          placeholder="input search text"
        />
        <h2>All posts</h2>
      </div>
      <h2
        className="contaner"
        style={{ textAlign: "center", padding: "0px 0px" }}
      >
        Total: {total}
      </h2>
      <div className="All_posts_card container">
        {loading ? (
          <Loading />
        ) : data.length !== 0 ? (
          <Fragment>
            {data.map((post) => (
              <PostsCard key={post._id} {...post} />
            ))}
            {pagination}
          </Fragment>
        ) : (
          <Free />
        )}
      </div>
    </section>
  );
};

export default PostsP;
