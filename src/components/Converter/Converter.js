import React from 'react'

import {Component} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

class Converter extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      currencyInput: 'USD',
      currencyOutput: 'EUR',
      amountInput: 0,
      amountOutput: 0,
      options: []
    }
 }


handleChange = event => {
  const target = event.target
  const value = target.value
  const name = target.name

this.setState({ [name]: value })
}

handleSubmit = event => {
  event.preventDefault () //Preventing form from submitting


fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=5b50188818b66f0208cd3f89d6d35f2b`)
.then(res => res.json())
.then(data => {
  const rateFromEuroToInput = data.rates[this.state.currencyInput] 
  const inputInEuros = this.state.amountInput / rateFromEuroToInput
  const rateFromEuroToOutput = data.rates[this.state.currencyOutput]
  const eurosInOutput = inputInEuros * rateFromEuroToOutput
  
this.setState({ amountOutput: eurosInOutput })
  })
}

componentDidMount() {
  fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=5b50188818b66f0208cd3f89d6d35f2b`)
  .then(res => res.json())
  .then(data => { 
    document.querySelector(".date").textContent = data.date;
    const currencyOptions = Object.keys(data.rates)

  this.setState({ options: currencyOptions })
  })
}


render() {
  return (
    <>
    <article className="br-2 dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw7 center">
      <div className="card card-body p-3 mb-3 bg-light text-dark">
        <h1 className="mb-4">Currency Converter</h1>
          <div className="date"></div>
            <form onSubmit={this.handleSubmit}>
              <div className="d-flex">
              <div className="form-row col-md-6 col-sm-6 offset-1">
                <div className="form-group col-md-8">
                  <div className="mb-2">
                    <label><strong>Currency I Have</strong></label>
                  </div>
                  <i className="fa fa-user icon"></i>
                  <select className="form-select"
                    type="text"
                    name='currencyInput'
                    value={this.state.currencyInput}
                    onChange={this.handleChange}
                  >
                    {this.state.options.map(option => {
                      return <option value={option}>{option}</option>
                      })
                    }
                  </select>
                </div>
                <div className="form-group col-md-8 mt-4">
                  <div className="mb-2">
                  <label><strong>Amount</strong></label>
                  </div>
                  <input className="form-control"
                  name="amountInput"
                  type="number"
                  value={this.state.amountInput}
                  onChange={this.handleChange} 
                  />
                </div>
              </div>
              <div className="form-row col-md-6 col-sm-6">
                <div className="form-group col-md-8">
                  <div className="mb-2">
                    <label><strong>Currency I Want</strong></label>
                  </div>
                  <select className="form-select"
                  type="text"
                  name='currencyOutput'
                  value={this.state.currencyOutput}
                  onChange={this.handleChange} 
                  >
                  {this.state.options.map(option => {
                    return <option value={option}>{option}</option>
                    })
                  }
                  </select>
                </div>
                <div className="form-group col-md-8 mt-4">
                  <div className="mb-2">
                    <label><strong>Amount</strong></label>
                  </div>
                  <input className="form-control"
                    name="amountOutput"
                    type="number"
                    value={this.state.amountOutput}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <br/>
              <button type="submit" className="btn btn-primary mb-2">Convert</button>
            </form>
        </div>
       </article>
      </>
    )
  }
}



export default Converter