import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import './card.css';

const CardCategory = ({ _id, name, description }) => {
  return (
    <div className="categorycard">
      <Link to={`/category/${_id}`} style={{ textDecoration: "none" }}>
        <h2>{name}</h2>
        <p>{description}</p>
      </Link>
    </div>
  );
};

CardCategory.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  
};

export default CardCategory;