import React, { useState, useEffect, useCallback, Fragment } from "react";
// import "./style.css"
import "./hra.css";
import Header from "../components/Header";
// import Fragment from "../Fragment/Fragment"

const Hracalculator = () => {
  const [basicSalary, setBasicSalary] = useState(0);
  const [hraReceived, setHRAReceived] = useState(0);
  const [rentPaid, setRentPaid] = useState(0);
  const [exemptedHRA, setExemptedHRA] = useState(0);
  const [taxableHRA, setTaxableHRA] = useState(0);

  const calculateHRA = useCallback(() => {
    const actualHRAReceived = Math.min(
      hraReceived,
      rentPaid,
      basicSalary * 0.5
    );
    const exemptedHRA = actualHRAReceived;
    const taxableHRA = hraReceived - exemptedHRA;

    setExemptedHRA(exemptedHRA.toFixed(2));
    setTaxableHRA(taxableHRA.toFixed(2));
  }, [hraReceived, rentPaid, basicSalary]);

  useEffect(() => {
    calculateHRA();
  }, [calculateHRA]);

  const handleBasicSalaryChange = (event) => {
    setBasicSalary(parseFloat(event.target.value));
  };

  const handleHRAReceivedChange = (event) => {
    setHRAReceived(parseFloat(event.target.value));
  };

  const handleRentPaidChange = (event) => {
    setRentPaid(parseFloat(event.target.value));
  };

  return (
    <Fragment>
      <Header />
      <section className="hra-box">
      <h4 className="hra-heading">
              House Rent Allowance Calculator
            </h4>
        <div className="hra-container">
          <div className="left-side">
            
            <p className="para1">
              Are you aware of how to calculate your House Rent Allowance
              exemption?
            </p>
            <p className="para2">
              The HRA calculator online is your best choice to do
              the job in mere seconds!
            </p>

            <div className="given-input">
              <label htmlFor="basic-salary">Basic Salary</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={basicSalary}
                  onChange={handleBasicSalaryChange}
                />
                <p className="ruppes-symbol">₹</p>
              </div>
            </div>

            <div className="given-input">
              <label htmlFor="hra recived">HRA Recieved</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={hraReceived}
                  onChange={handleHRAReceivedChange}
                />
                <p className="ruppes-symbol">₹</p>
              </div>
            </div>

            <div className="given-input">
              <label htmlFor="rent-paid">Rent Paid</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={rentPaid}
                  onChange={handleRentPaidChange}
                />
                <p className="ruppes-symbol">₹</p>
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="right-container">
              <div className="selling-cost">
                <p>Exempted HRA</p>
                <p>{exemptedHRA}</p>
              </div>

              <div className="total-hra">
                <p>Taxable HRA</p>
                <p>{taxableHRA}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Hracalculator;
