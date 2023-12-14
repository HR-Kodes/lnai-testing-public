import React from "react";
import SlickSlider from "../../UI/Slick";
import SliderData from "../../../data/Slider/home-1";
import { Link } from "react-router-dom";
import '../../../assets/css/new_slider.css';

const NextArrow = ({ className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <i className="fa fa-angle-right" />
    </button>
  );
};

const PrevArrow = ({ className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <i className="fa fa-angle-left" />
    </button>
  );
};

const Slider = (props) => {
  const settings = {
    arrows: true,
    dots: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className={"slider-area"}>
      <SlickSlider settings={settings}>
        {SliderData.map((item) => (
          <div key={item.id}>
            <div className="slider-item">
              <div className="container slider-container">
                <div className="row leftElement">
                  <div className="col-xl-10">
                    <div className="slider-content">
                      <h2>{item.title}</h2>
                      <p>{item.text}</p>
                      <Link
                        to={`${process.env.PUBLIC_URL + item.btnLink}`}
                        className="btn btn-brand"
                      >
                        {item.btnText}
                      </Link>
                    </div>
                  </div>
                </div>


                <div className="content__hero_video-wrap">
                <div className="content__hero_video-block">
                  <video className="myVideo" 
                  src={props.url} autoPlay muted loop />
                  </div>
                  {/* <div className="content__hero_video-block">
                    <iframe src="https://general-site-bucket.s3.ap-south-1.amazonaws.com/legalniti(compressed).mp4" title="iframe-video" allowfullscreen="" className="video-to-iframe" autoplay></iframe>
                    <div className="content__hero_play" style={{ display: 'none'}}>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 12 14">
                          <path id="play" d="M15.128,8.446,6.567,3.251a1.651,1.651,0,0,0-1.714,0A1.787,1.787,0,0,0,4,4.791V15.211a1.788,1.788,0,0,0,.847,1.556,1.651,1.651,0,0,0,1.72,0l8.562-5.21a1.824,1.824,0,0,0,0-3.111Z" transform="translate(-4 -3.009)" fill="#545f7e"></path>
                        </svg>
                      </span>
                    </div>
                  </div> */}
                </div>




              </div>
            </div>
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};
export default Slider;
