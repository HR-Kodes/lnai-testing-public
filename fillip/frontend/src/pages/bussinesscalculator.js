import React, { useState, useEffect, Fragment } from "react";
// import "./style.css"
import "./busc.css";
import Header from "../components/Header";
// import Fragment from "../Fragment/Fragment"

const Bussinesscalculator = () => {
  const [investment, setInvestment] = useState("");
  const [revenue, setRevenue] = useState("");
  const [profit, setProfit] = useState("");

  useEffect(() => {
    const calculateProfit = () => {
      const calculatedProfit = revenue - investment;
      setProfit(calculatedProfit);
    };

    calculateProfit();
  }, [investment, revenue]);

  const handleInvestmentChange = (e) => {
    setInvestment(e.target.value);
  };

  const handleRevenueChange = (e) => {
    setRevenue(e.target.value);
  };
  return (
    <Fragment>
      <Header />
      <section className="busc-box">
      <h4 className="busc-heading">
              Calculate Startup/Setup Costs
            </h4>
        <div className="busc-container">
          <div className="left-side">
            
            <div className="given-input">
              <label  className="box-heading" >Investment</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={investment}
                  onChange={handleInvestmentChange}
                />
                <p className="ruppes-symbol">₹</p>
              </div>
            </div>
            <div className="given-input">
              <label  className="box-heading">Revenue</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={revenue}
                  onChange={handleRevenueChange}
                />
                <p className="ruppes-symbol">₹</p>
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="right-container">
              <div className="selling-cost">
                <p>Profit</p>
                <p>{profit}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Bussinesscalculator;
