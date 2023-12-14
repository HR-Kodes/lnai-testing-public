import React, { useState, useEffect, Fragment } from "react";
// import "./style.css"
import "./nps.css";
import Header from "../components/Header";
// import Fragment from "../Fragment/Fragment"

const Npscalculator = () => {
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [investmentPeriod, setInvestmentPeriod] = useState(0);
  const [expectedReturnRate, setExpectedReturnRate] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);
  const [maturityAmount, setMaturityAmount] = useState(0);

  const calculateTotalAmount = () => {
    const interestRate = expectedReturnRate / 100;
    const numberOfInstallments = investmentPeriod * 12;
    const futureValue =
      monthlyContribution *
      ((1 + interestRate, numberOfInstallments - 1) / interestRate) *
      (1 + interestRate);

    const totalInvestment = monthlyContribution * numberOfInstallments;
    const interestEarned = futureValue - totalInvestment;

    setTotalInvestment(totalInvestment.toFixed(2));
    setInterestEarned(interestEarned.toFixed(2));
    setMaturityAmount(futureValue.toFixed(2));
  };

  useEffect(calculateTotalAmount, [
    monthlyContribution,
    investmentPeriod,
    expectedReturnRate,
  ]);

  const handleMonthlyContributionChange = (event) => {
    setMonthlyContribution(parseFloat(event.target.value));
  };

  const handleInvestmentPeriodChange = (event) => {
    setInvestmentPeriod(parseInt(event.target.value));
  };

  const handleExpectedReturnRateChange = (event) => {
    setExpectedReturnRate(parseFloat(event.target.value));
  };
  return (
    <Fragment>
      <Header />
      <section className="nps-box">
      <h4 className="nps-heading">NPS Calculator</h4>
        <div className="nps-container">
          <div className="left-side">
            <p className="para1">
              Find out how much money you can save for your future!
            </p>
            <p className="para2">
              Calculate your National Pension Scheme amount in seconds using the
              NPS calculator!
            </p>

            <div className="given-input">
              <label htmlFor="monthly-contributin">Monthly Contribution</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={handleMonthlyContributionChange}
                />
                <p className="ruppes-symbol">₹</p>
              </div>
            </div>

            <div className="given-input">
              <label htmlFor="investment period">Investment Period</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={investmentPeriod}
                  onChange={handleInvestmentPeriodChange}
                />
                <p className="year-symbol">yr</p>
              </div>
            </div>

            <div className="given-input">
              <label htmlFor="return rate">Expected Return Rate</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={expectedReturnRate}
                  onChange={handleExpectedReturnRateChange}
                />
                <p className="percentage-symbol">%</p>
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="right-container">
              <div className="selling-cost">
                <p>Total Investment</p>
                <p>₹ {totalInvestment}</p>
              </div>

              <div className="total-nps">
                <p>Interest Earned</p>
                <p> {interestEarned}</p>
              </div>
              <div className="total-profit">
                <p>Maturity Amount</p>
                <p> {maturityAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Npscalculator;
