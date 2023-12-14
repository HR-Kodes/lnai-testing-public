import React from 'react';
import parse from "html-react-parser";
import aboutData from "../../../data/About/home-two";
import '../../About/home-two/about.css';
import aboutimg from "../../../assets/img/about-3.jpg"




const About = () => {
    return (
        <div className="home-two-about-area" >
            
                <div className="row align-items-center-about-area">
                    <div className="col-lg-6 override" >
                        <div className="about-content about-content--2">
                            
                            <h1>Streamline Your Startup Journey with AI-Powered Simplicity</h1>
                            <h5>At Legal Niti, we leverage the latest AI technology to simplify the process of incorporating your startup and ensuring GST compliance. Our user-friendly platform automates company registration, license acquisition, GST filing, and compliance management</h5>
                            
                            {/* <Link to={`${process.env.PUBLIC_URL + aboutData.btnLink}`} className="btn-about">{aboutData.btnText} <i className="fa fa-angle-double-right"/></Link> */}
                        </div>
                    </div>
                </div>
                <div className="content__hero_video-wrap-about-wrap">
                    <img src={aboutimg} style={{borderRadius:'20px'}} />
                </div>

            
        </div>
    );
};

export default About;
