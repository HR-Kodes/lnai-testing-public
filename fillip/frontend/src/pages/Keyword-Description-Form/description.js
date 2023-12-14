import React, { Fragment } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import './description.css';

export default function KeywordForm() {
    return (
        <Fragment>
            <Header />
            <div className="Appi">
                <h1 className="heading-description-form">Get Your Company Name</h1>


                <div className="dropdown">
                    <label htmlFor="company" className="company-heading"><strong>Type Of Company:</strong></label>
                    <select className="dropdown-select" >
                        <option value="">Select Here</option>
                        <option value="option1">Public Limited Company</option>
                        <option value="option2">Unlimited Company</option>
                        <option value="option3">Producer Company</option>
                        <option value="option1">Private Company</option>
                        <option value="option2">Subsidiary of a Foreign Company as Private Limited Company </option>
                        <option value="option3">Private (OPC)</option>
                        <option value="option3">IFSC company</option>
                        <option value="option3">Nidhi Company</option>
                        <option value="option3">LLP</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="Keyword" className="keyword-heading"><strong>Keyword:</strong></label>
                    <input
                        type="text"
                        className="input-keyword"
                    />
                </div>

                <div>
                    <label htmlFor="Description" className="description-heading"><strong>Description:</strong></label>
                    <input
                        type="text"
                        className="input-description"
                    />
                </div>

                <button className="button">Submit</button>
            </div>
            <Footer />
        </Fragment>
    )
}