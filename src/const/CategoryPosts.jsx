import postImg from "../assets/card-image.png";
import PropTypes from "prop-types";
import "./categoryposts.scss"
import { Link } from "react-router-dom";
const CategoryPosts = ({ title, description,category,_id }) => {
  return (
    <div className="container">
      <div className="categorypost">
        <img src={postImg} alt="" />
        <div className="right">
          <h3>{category.name}</h3>
          <h2>{title}</h2>
          <p>{description}</p>
          <Link
            style={{
              color: "white",
              textDecoration: "none",
              background: "#FFD050",
              padding: "10px",
              width:"100px",
            }}
            to={`/posts/${_id}`}
          >
            Read More
          </Link>
        </div>
        <br />
      </div>
    </div>
  );
};
CategoryPosts.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  _id: PropTypes.string,
};
export default CategoryPosts