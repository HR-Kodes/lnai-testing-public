import React, { useState, useEffect, useCallback,Fragment } from "react"
// import "./style.css"
import "./rd.css"
import Header from "../components/Header"
// import Fragment from "../Fragment/Fragment"

const Rdcalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(0)
  const [expectedReturnRate, setExpectedReturnRate] = useState(0)
  const [timePeriod, setTimePeriod] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  const [investedAmount, setInvestedAmount] = useState(0)
  const [estimatedReturns, setEstimatedReturns] = useState(0)

  const calculateRD = useCallback(() => {
    const totalMonths = timePeriod * 12
    const totalInvestment = monthlyInvestment * totalMonths
    const interestRatePerMonth = expectedReturnRate / 1200
    const maturityAmount =
      monthlyInvestment *
      ((Math.pow(1 + interestRatePerMonth, totalMonths) - 1) /
        interestRatePerMonth)
    const returns = maturityAmount - totalInvestment

    setTotalValue(maturityAmount.toFixed(2))
    setInvestedAmount(totalInvestment.toFixed(2))
    setEstimatedReturns(returns.toFixed(2))
  }, [monthlyInvestment, expectedReturnRate, timePeriod])

  useEffect(() => {
    calculateRD()
  }, [calculateRD])

  const handleMonthlyInvestmentChange = event => {
    setMonthlyInvestment(parseFloat(event.target.value))
  }

  const handleExpectedReturnRateChange = event => {
    setExpectedReturnRate(parseFloat(event.target.value))
  }

  const handleTimePeriodChange = event => {
    setTimePeriod(parseFloat(event.target.value))
  }

  return (
    <Fragment>
      <Header/>
      <section className="rd-box">
      <h4 className="rd-heading">
              RD Calculator For Maturity Amount
            </h4>
        <div className="rd-container">
          <div className="left-side">
            
            <p className="para1">
              Know your Future RD returns in just a click with the 
              RD Calculator
            </p>

            <div className="given-input">
              <label htmlFor="monthly investment">Monthly Investment</label>
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
              <label htmlFor="return rate">Expected Return Rate</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={expectedReturnRate}
                  onChange={handleExpectedReturnRateChange}
                />
                <p className="percentage-symbol">₹</p>
              </div>
            </div>

            <div className="given-input">
              <label htmlFor="time period">Time Period</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={timePeriod}
                  onChange={handleTimePeriodChange}
                />
                <p className="year-symbol">yr</p>
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="right-container">
              <div className="selling-cost">
                <p>Total Value</p>
                <p>₹ {totalValue}</p>
              </div>

              <div className="total-rd">
                <p>Invested Amount</p>
                <p>₹ {investedAmount}</p>
              </div>
              <div className="total-profit">
                <p>Estimated Returns</p>
                <p>₹ {estimatedReturns}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Rdcalculator
