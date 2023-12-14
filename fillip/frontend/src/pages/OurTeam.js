import React from 'react';
import Content from "../../src/components/UI/Content/index";
import Thumbnail from "../components/UI/Thumbnail/index";

const OurTeam = () => {
    return (
        <div className="page-about-wrapper sm-top">
            <div className="container">
                <div className="row align-items-lg-center" style={{textAlign:"center"}}>
                        <Content classes="about-content ml-0" style={{textalign:"center"}}>
                            <h2>Discover Legal Niti's exceptional team</h2>
                        </Content>
                </div>
            </div>
        </div>
    );
};

export default OurTeam;