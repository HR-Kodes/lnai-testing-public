import React, { useState, useEffect,Fragment } from "react"
// import "./style.css"
import "./ppf.css"
import Header from "../components/Header"
// import Fragment from "../Fragment/Fragment"

const PPfcalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(0)
  const [interestRate, setInterestRate] = useState(0)
  const [investmentPeriod, setInvestmentPeriod] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  const [investedAmount, setInvestedAmount] = useState(0)
  const [estimatedReturns, setEstimatedReturns] = useState(0)

  const calculatePPF = () => {
    const interestRatePercentage = interestRate / 100
    const numberOfMonths = investmentPeriod * 12
    const totalValue =
      monthlyInvestment *
      ((Math.pow(1 + interestRatePercentage / 12, numberOfMonths) - 1) /
        (interestRatePercentage / 12))
    const investedAmount = monthlyInvestment * numberOfMonths
    const estimatedReturns = totalValue - investedAmount

    setTotalValue(totalValue.toFixed(2))
    setInvestedAmount(investedAmount.toFixed(2))
    setEstimatedReturns(estimatedReturns.toFixed(2))
  }

  useEffect(calculatePPF, [monthlyInvestment, interestRate, investmentPeriod])

  const handleMonthlyInvestmentChange = event => {
    setMonthlyInvestment(parseFloat(event.target.value))
  }

  const handleInterestRateChange = event => {
    setInterestRate(parseFloat(event.target.value))
  }
  const handleInvestmentPeriodChange = event => {
    setInvestmentPeriod(parseInt(event.target.value))
  }

  return (
    <Fragment>
      <Header/>
      <section className="ppf-box">
      <h4 className="ppf-heading">Calculate Your PPF Online Now!</h4>
        <div className="ppf-container">
          <div className="left-side">
            
            <p className="para1">
              Get accurate maturity and interest calculations with our PPF
              Calculator.
            </p>
            <p className="para2">
              Calculate the maturity amount and interest earned on your Public
              Provident Fund (PPF) investment with our PPF Calculator.
            </p>

            <div className="given-input">
              <label htmlFor="investment">Monthly Investment</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={monthlyInvestment}
                  onChange={handleMonthlyInvestmentChange}
                />
                <p className="ruppes-symbol">₹</p>
              </div>
            </div>

            <div className="given-input">
              <label htmlFor="interst-rate">Interest Rate</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                />
                <p className="percentage-symbol">%</p>
              </div>
            </div>

            <div className="given-input">
              <label htmlFor="invest-period">Investment Period</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={investmentPeriod}
                  onChange={handleInvestmentPeriodChange}
                />
                <p className="year-symbol">yr</p>
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="right-container">
              <div className="selling-cost">
                <p>Total Value</p>
                <p>{totalValue}</p>
              </div>

              <div className="total-ppf">
                <p>Invested Amount</p>
                <p>{investedAmount}</p>
              </div>

              <div className="total-profit">
                <p>Estimated Returns</p>
                <p>{estimatedReturns}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default PPfcalculator
