import { useEffect, useState } from "react";
import { request } from "../../server/request";

const MyPostsP = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      try {
        let { data } = await request.get("post/user");
        setPosts(data.data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getPosts();
  }, []);
  console.log(posts);
  return <section className="container" style={{height:"75vh",paddingTop:"80px"}}>
    Hozircha bu yerda postlar yoq Dalerning bilimsizligi tufayli
  </section>;
};

export default MyPostsP;
