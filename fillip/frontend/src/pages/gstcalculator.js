import React, { useState, useEffect, Fragment } from "react";
import Header from "../components/Header";
import "./gst.css";

const Gstcalculator = () => {
  const [inclusive, setInclusive] = useState(true);
  const [cost, setCost] = useState("");
  const [gstRate, setGstRate] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalGst, setTotalGst] = useState(0);
  const [profitRatio, setProfitRatio] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    calculateGst();
  }, [cost, gstRate, inclusive]);

  const handleRadioChange = (e) => {
    setInclusive(e.target.value === "inclusive");
  };

  const handleCostChange = (e) => {
    setCost(e.target.value);
  };

  const handleGstRateChange = (e) => {
    setGstRate(Number(e.target.value));
  };

  const handleProfitRatioChange = (e) => {
    setProfitRatio(Number(e.target.value));
  };

  const calculateGst = () => {
    const costValue = Number(cost);
    const gstPercentage = gstRate / 100;

    if (inclusive) {
      const totalGstValue = (costValue * gstPercentage) / (1 + gstPercentage);
      const totalCostValue = costValue - totalGstValue;
      const totalProfitValue =
        (costValue * (1 - gstPercentage) * profitRatio) / 100;

      setTotalCost(totalCostValue.toFixed(2));
      setTotalGst(totalGstValue.toFixed(2));
      setTotalProfit(totalProfitValue.toFixed(2));
    } else {
      const totalGstValue = costValue * (gstRate / 100);
      const totalCostValue = costValue + totalGstValue;
      const totalProfitValue = (costValue * profitRatio) / 100;

      setTotalCost(totalCostValue.toFixed(2));
      setTotalGst(totalGstValue.toFixed(2));
      setTotalProfit(totalProfitValue.toFixed(2));
    }
  };

  return (
    <Fragment>
      <Header />
      <section className="gst-box">
      <h3 className="gst-heading">
              GST Calculator
        </h3>
        <div className="gst-container">
          <div className="left-side">
            <p className="para1">Don't know how to calculate GST?</p>
            <p className="para2">
              Get the best GST calculator in India. Easy GST
              calculation in seconds, anytime and anywhere!
            </p>

            <div className="radio-buttons">
              
                <input
                  className="radio-11"
                  type="button"
                  value="inclusive"
                  defaultChecked={inclusive}
                  onClick={handleRadioChange}
                />
               {/* <label> GST Inclusive
              </label> */}
              
                <input
                  className="radio-12"
                  type="button"
                  value="exclusive"
                  defaultChecked={!inclusive}
                  onClick={handleRadioChange}
                />

               {/* <label> GST Exclusive
              </label> */}
            </div>
            <div className="given-input">
              <label htmlFor="cost-service">Cost of Goods/Services</label>
              <div className="user-input-rs">
                <input type="number" value={cost} onChange={handleCostChange} />
                <p className="ruppes-symbol">₹</p>
              </div>
            </div>
            <div className="given-input">
              <label htmlFor="gst-rate">GST Rate</label>
              <div className="user-input-rs">
                <select value={gstRate} onChange={handleGstRateChange}>
                  
                  <option value={3}>3%</option>
                  <option value={5}>5%</option>
                  <option value={12}>12%</option>
                  <option value={18}>18%</option>
                  <option value={28}>28%</option>
                </select>
              </div>
            </div>

            {!inclusive && (
              <div className="given-input">
                <label htmlFor="proft-ratio">Profit Ratio</label>
                <div className="user-input-rs">
                  <input
                    type="number"
                    value={profitRatio}
                    onChange={handleProfitRatioChange}
                  />
                  <p className="ruppes-symbol">₹</p>
                </div>
              </div>
            )}
          </div>
          <div className="right-side">
            <div className="right-container">
              <div className="selling-cost">
                {!inclusive && <p>Total Cost of Selling</p>}
                {!inclusive && <p>₹{totalCost}</p>}
                {inclusive && <p>Total Cost of Selling</p>}
                {inclusive && <p>₹ {totalCost}</p>}
              </div>

              <div className="total-gst">
                {!inclusive && <p>Total GST</p>}
                {!inclusive && <p>₹{totalGst}</p>}
                {inclusive && <p>Total GST</p>}
                {inclusive && <p>₹ {totalGst}</p>}
              </div>

              <div className="total-profit">
                {!inclusive && <p>Total Profit</p>}
                {!inclusive && <p>₹ {totalProfit}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default Gstcalculator;
