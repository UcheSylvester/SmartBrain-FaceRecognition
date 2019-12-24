import React, { Component } from 'react'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  onRegister = () => {
    fetch('https://polar-inlet-44239.herokuapp.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          this.props.loadUser(data)
          this.props.onRouteChange('home')
        } else {
          alert(data)
        }
      })
  }

  render() {
    const { onRouteChange } = this.props
    return (
      <div className="br3  ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center" >
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="name"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                style={{ cursor: 'pointer' }}
                onClick={() => onRouteChange('signin')}
                className="f6 link dim black db">
                Already have an account, sign in
            </p>
            </div>
          </div>
        </main>
      </div>
    )

  }
}

export default Register