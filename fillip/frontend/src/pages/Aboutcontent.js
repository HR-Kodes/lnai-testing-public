import React from 'react';
import parse from "html-react-parser";
import aboutData from "../../src/data/About/home-two.json"

const AboutContent = () => {
    return (
        <div className='aboutcontent'>
            <div className="aboutcontent-heading ">
                <h2>Building strong bridges between businesses and professionals.</h2>
                <div className='aboutcontent-list' >
                    <ul className='main-content'>
                        <li>We leverage cutting-edge AI-powered technology to streamline the process and ensure seamless incorporation and efficient tax compliance for businesses</li>
                        <li>Our specialists have a deep understanding of legal requirements and regulations, ensuring your business is set up and compliant in the most efficient manner</li>
                        <li>Our advanced AI algorithms analyze vast amounts of data, enabling us to provide personalized, accurate solutions tailored to your business needs. This technology streamlines the process, saving you time and reducing the chances of errors</li>
                        <li>We are dedicated to providing the highest level of customer satisfaction. Our team takes a customer-centric approach, working closely with you to understand your unique requirements</li>
                        <li>Our mission is to simplify the incorporation and tax compliance process for businesses, empowering them to focus on their core operations. </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AboutContent;