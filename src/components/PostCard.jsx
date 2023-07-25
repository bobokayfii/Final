import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import postImg from "../assets/card-image.png";

const PostCard = ({  title, description, user,_id }) => {
  return (
    <div className="postcard">
      <img src={postImg} alt="" />
      <h2>{title}</h2>
      <p className="avtor">
        By {user.first_name} {user.last_name} | Aug 23 ,2021
      </p>
      <p>{description}</p>
      <Link
        style={{
          color: "white",
          textDecoration: "none",
          background: "#FFD050",
          padding:"10px",
        }}
        to={`/posts/${_id}`}
      >
        Read More
      </Link>
      <br />
    </div>
  );
};

PostCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  user: PropTypes.string,
  _id: PropTypes.string,
};

export default PostCard;
