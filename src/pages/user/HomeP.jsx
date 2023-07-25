import './HomeP.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import { ENDPOINT } from '../../const';
import axios from 'axios';
import Loading from '../../components/Loading';
import Free from '../../components/Free';
import CardCategory from '../../components/CardCategory';
import PostCard from '../../components/PostCard';
import { Link, useParams } from 'react-router-dom';


const HomeP = () => {
 
     

  const settings = { 
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 3, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 2000, 
    prevArrow: <button className="slick-prev">Previous</button>, 
    nextArrow: <button className="slick-next">Next</button>, 
  }; 

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const getData = async () => {
        setLoading(true);
        try {
          let { data } = await axios.get(`${ENDPOINT}/category`);
          // console.log(data.data);
          setData(data.data)
        } catch (err){
          console.log(err.message);
        } finally{
          setLoading(false)
        }
      }
    const [data2, setData2] = useState([]);
    const getPostOne = async () => {
      setLoading(true);
      try {
        let { data } = await axios.get(`${ENDPOINT}/post/lastones`);
        console.log(data);
        setData2(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    const[showcase,Setshowcase]=useState({user:"",description:"",category:"",_id:""});
    const{user,description,category,_id}=showcase;
    const getShowcase = async() => {
         try {
           let { data } = await axios.get(`${ENDPOINT}/post/lastone`);
           console.log(data);
           Setshowcase(data);
         } catch (err) {
           console.log(err.message);
         } finally {
           setLoading(false);
         }
    }
    useEffect(() =>{
      getPostOne();
      getData();
      getShowcase();
    }, [])

    const postParams=useParams();
    const postId =postParams.id;
    console.log();
  return (
    <section>
      <div className="homePa">
        <div className="text container">
          <p className="p1">
            Posted on <strong>{category.name}</strong>
          </p>
          <h1 className="hh1">{category.description}</h1>
          <p className="p2">
            By <span className="james">{user.first_name} {user.last_name}</span> | May 23, 2022{" "}
          </p>
          <p className="p3">{description}</p>
          <Link to={`/posts/${_id}`} className="buttonn">
            Read More 
          </Link>
        </div>
      </div>

      <div style={{ padding: "40px" }} className="container">
        <Slider {...settings}>
          {loading ? (
            <Loading />
          ) : data2?.length !== 0 ? (
            data2?.map((pr) => <PostCard key={pr._id} {...pr} />)
          ) : (
            <Free />
          )}
        </Slider>
      </div>

      <div style={{ padding: "40px" }} className="container">
        <Slider {...settings}>
          {loading ? (
            <Loading />
          ) : data?.length !== 0 ? (
            data?.map((pr) => <CardCategory key={pr._id} {...pr} />)
          ) : (
            <Free />
          )}
        </Slider>
        
      </div>
    </section>
  );
};

export default HomeP;
