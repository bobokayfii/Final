import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../../const";
import Loading from "../../components/Loading";
import CategoryPosts from "../../const/CategoryPosts";
import Free from "../../components/Free";
import { Input } from "antd";

const Category = () => {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      let { data } = await axios.get(
        `${ENDPOINT}/post?category=${id}&search=${searchValue}`
      );
      setData(data.data);
    } catch (err) {
      console.log(err.message);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const [category, setCategory] = useState({ name: "", description: "" });
  const { name, description } = category;

  const getCategory = async () => {
    setLoading(true);
    setError(null);
    try {
      let { data } = await axios.get(`${ENDPOINT}/category/${id}`);
      setCategory(data);
    } catch (err) {
      console.log(err.message);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
    getData();
  }, [searchValue]);

  return (
    <div className="main">
      <div className="head container">
        <h2>{name.toUpperCase()}</h2>
        <p>{description}</p>
        <h3>BLOG {"< " + name.toUpperCase()}</h3>
      </div>
      <div className="container">
        <Input
          className="categorypostsinput"
          placeholder="Basic usage"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <span></span>
        {loading ? (
          <Loading />
        ) : error ? (
          <p>{error}</p>
        ) : data?.length !== 0 ? (
          data?.map((pr) => <CategoryPosts key={pr._id} {...pr} />)
        ) : (
          <Free />
        )}
      </div>
    </div>
  );
};

export default Category;
