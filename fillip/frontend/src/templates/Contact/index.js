import React from 'react';
import From from "./From";
import ContactInfo from "./ContactInfo";
import contactpage from "../../assets/img/contactpage.png"

const ContactPage = () => {
    return (
        <div className={'contact-page-area-wrapper sp-y spp'}>
            <div className="contactcontainer">
                <div className='contact-leftitem'>
                    <img src={contactpage} />
                </div>
                <div className="contact-content-wrap">
                    <div className="row contactrow">
                        <div className="col-lg-8">
                            <div className="contact-form-area contact-method">
                                <h3>Send us a Message</h3>
                                <From/>
                            </div>
                        </div>

                        {/* <div className="col-lg-4">
                            <div className="contact-information contact-method">
                                <div className="contact-info-con">
                                    <h3>Contact Info</h3>
                                    <ContactInfo
                                        address="Legalniti workspace,5th floor PG block BMSCE,Bull temple road,Basavanagudi Bangalore 560019<br />
                                        contact@legalniti.com <br />
                                        (+91)9481829401,(+91)7371889861"
                                    />
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;