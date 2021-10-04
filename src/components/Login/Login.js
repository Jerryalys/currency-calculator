import React, {Component} from 'react'


class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      logInEmail: '',
      logInPassword: ''
    }
  }

  onLogIn = () => {
    fetch('http://localhost:3000/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.logInEmail,
        password: this.state.logInPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          this.props.onRouteChange('home');
        }
      })
    }

  onEmailChange = (event) => {
    this.setState({logInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({logInPassword: event.target.value})
  }

  render () {
    return (
    <article className="br2 ba dark-gray b--black-30 mv6 w-100 w-50-m w-25-l mw5 center">
      <main className="pa4 black-80">
        <div className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Log In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email" 
                id="email-address"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password"  
                id="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input  
              onClick={this.onLogIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit" 
              value="Log in" 
            />
          </div>
        </div>
      </main>
    </article>
    );
  }
}

export default Login