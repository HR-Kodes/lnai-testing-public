import React from "react";
import Text from "../UI/Text";
import Widget from "../UI/Widget";
import List from "../UI/List";
import LI from "../UI/List/Item";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import waveImage from "../../assets/img/wave.png";
// import "../../assets/css/footer.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp, faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer-area sp-bottom">
      
      {/* <div className="Waves">
            <div className="wave" id="wave1"></div>
            <div className="wave" id="wave2"></div>
            <div className="wave" id="wave3"></div>
          
          </div> */}
      
        <div className="row mtn-40">
          
          <div className="col-lg-4 order-4 order-lg-0 footer-logo">
            <div className="widget-item">
              <div className="about-widget">
                <Link to={`${process.env.PUBLIC_URL + "/"}`}>
                  <img src={Logo} alt="Logo" />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-lg-2 ml-auto">
            <Widget title="Information">
              <List classes="widget-list">
                <LI>
                  <Link to={`${process.env.PUBLIC_URL + "/about"}`}>
                    Our company
                  </Link>
                </LI>
                <LI>
                  <Link to={`${process.env.PUBLIC_URL + "/contact"}`}>
                    Contact us
                  </Link>
                </LI>
                <LI>
                  <Link to={`${process.env.PUBLIC_URL + "/services"}`}>
                    Our services
                  </Link>
                </LI>
                <LI>
                  <Link to={`${process.env.PUBLIC_URL + "/"}`}>Careers</Link>
                </LI>
              </List>
            </Widget>
          </div>

          <div className="col-md-4 col-lg-2 ml-auto">
            <Widget title="Social Links">
              <ul classes="widget-list">
              <li>
                  <a href="https://wa.me/919091013207" target='blank'>  
                    <FontAwesomeIcon icon={faWhatsapp} style={{ color: 'white', width: '80px',fontSize: '34px' }} />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/legalniti_ai?utm_source=qr" target='blank'>  
                    <FontAwesomeIcon icon={faInstagram} style={{ color: 'white', width: '80px', fontSize: '34px'}} />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/legal-niti-20a44b279/" target='blank'>  
                    <FontAwesomeIcon icon={faLinkedin} style={{ color: 'white', width: '80px', fontSize: '34px'}} />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/legal_niti" target='blank'>  
                    <FontAwesomeIcon icon={faTwitter} style={{ color: 'white', width: '80px', fontSize: '34px'}} />
                  </a>
                </li>
                {/* <li>
                  <a href="#" target='blank'>  
                    <FontAwesomeIcon icon={faFacebook} style={{ color: 'white', width: '80px' ,fontSize: '34px' }} />
                  </a>
                </li> */}
              </ul>
            </Widget>
          </div>

          <div className="col-md-4 col-lg-3" style={{color:'white'}}>
            <Widget title="Contact Us">
              <address>
                Legalniti workspace,5th floor PG block BMSCE,Bull temple road,Basavanagudi Bangalore 560019<br />
                contact@legalniti.com <br />
                (+91)9481829401,(+91)7371889861
              </address>
            </Widget>
          </div>

        </div>
        
      
    </footer>
  );
}

export default Footer;
