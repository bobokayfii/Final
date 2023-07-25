import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Img from "../assets/card-image.png";
import "./posts.css";

const PostsCard = ({ title, description, category,_id }) => {
  return (
    <div className="posts_card_flex">
      <img src={Img} alt="" />
      <div className="posts_text">
        <p>{category.name}</p>
        <h2>{title}</h2>
        <p className="line_clamp">{description}</p>
        <Link
          style={{
            color: "white",
            textDecoration: "none",
            background: "#FFD050",
            padding: "10px",
            width:"100px"
          }}
          to={`${_id}`}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

PostsCard.propTypes = {
  _id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
};

export default PostsCard;
