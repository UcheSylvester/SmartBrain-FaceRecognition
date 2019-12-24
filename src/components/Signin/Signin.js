import React, { Component } from 'react'


class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signInEmail: '',
      signInPassword: '',
      error: false
    }
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value })
  }

  onSubmitSignIn = () => {
    fetch('https://polar-inlet-44239.herokuapp.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home')
        } else {
          alert(user)
        }
      })
  }

  render() {
    const { onRouteChange } = this.props
    // if (this.state.error === true) {
    //   return (
    //     <p>Incorrect password or email</p>
    //   )
    // }
    return (
      <div className="br3  ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center" >
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                  required
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
                  required
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="pointer b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('register')}
                className="f6 link dim black db">Register</p>
            </div>
          </div>
        </main>
      </div>


    )
  }

}

export default Signin