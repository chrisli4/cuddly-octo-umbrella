import React, { Component } from 'react';
import { connect } from 'react-redux';
import loginRequest from './actions';
import { Container, Row, Col } from 'mdbreact';
import { Field, reduxForm } from 'redux-form'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import renderField from '../elements/field'
import validate from '../lib/validate'


class Login extends Component {

	render() {

		const { handleSubmit } = this.props

		return (
			<Container className="mt-3">
				<Row>
					<Col className="mx-auto mt-3" style={{maxWidth:"450px"}}>
						<form onSubmit={handleSubmit(values => {
							if(values.email && values.password)
							this.props.loginRequest({ ...values })
						})}>
							<p className="h4 text-center mb-4">Sign In</p>
							<div>
								<label htmlFor="email" className="grey-text">Your email</label>
								<Field name="email" type="email" component={renderField} className="form-control mb-1"/>
							</div>
							<br/>
							<div>
								<label htmlFor="password" className="grey-text">Your password</label>
								<Field name="password" type="password" component={renderField} className="form-control mb-1"/>
							</div>
							<br/>
							<div className="text-center mt-4">
							<p className='small'>Need an account? Click <Link to='/register'>here</Link> to register</p>
							<button type="submit" className="btn btn-indigo">Login</button>
							</div>
						</form>
					</Col>
				</Row>
			</Container>
			)
	}

}

export default reduxForm({
	form: 'login',
	validate
})(connect(null, { loginRequest })(Login))