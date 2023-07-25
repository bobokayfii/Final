import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import img from "../../images/post.png"
import logo from "../../images/Image.png"
import { ENDPOINT } from "../../const";
import "./posp.scss"
const PostP = () => {
  const [post,setPost]=useState({title:"",description:"",category:"",user:"",tags:""});
  const params=useParams();
  const id=params.id;
  const{title,description,user,category,tags}=post;
 const getPost = async () => {
  try {
    let {data} = await axios.get(`${ENDPOINT}/post/${id}`);
    setPost(data);
  } catch (err) {
    console.log(err.message);
  }
};

useEffect(() => {
  getPost();
}, []);
  return (
    <section>
      <div className="container">
        <div className="postpage">
          <img className="apa" src={img} alt="" />
          <div className="texts">
            <div className="head">
              <img src={logo} alt="" />
              <div>
                <h5>

                {user.first_name}
                <span className="lastname">

                {user.last_name}
                </span>
                </h5>
                <p>Posted on 27th January 2022</p>
              </div>
            </div>
            <h1 className="title">{title}</h1>
            <h6>
              {category.name} ({tags})
            </h6>

            <h1 className="desc">{description}</h1>
            <h1 className="desc">{category.description}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostP;
