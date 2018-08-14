import React, { Component } from 'react';
import { connect } from 'react-redux';
import signupRequest from './actions';
import { Container, Row, Col } from 'mdbreact';
import { Field, reduxForm } from 'redux-form'
import { BrowserRouter as Route, Router, Link } from "react-router-dom";
import renderField from '../elements/field'
import validate from '../lib/validate'

class Signup extends Component {

	render() {

		const { handleSubmit } = this.props

		return (
			<Container className="mt-3">
				<Row>
					<Col className="mx-auto mt-3" style={{maxWidth:"450px"}}>
						<form onSubmit={handleSubmit(values => {
							if(values.username && values.email && values.password)
							this.props.signupRequest({ ...values })
						})}>
							<p className="h4 text-center mb-4">Sign Up</p>
							<div>
								<label htmlFor="email" className="grey-text">Your email</label>
								<Field name="email" type="email" component={renderField} className="form-control mb-1"/>
								</div>
							<br/>
							<div>
								<label htmlFor="username" className="grey-text">Your username</label>
								<Field name="username" type="text" component={renderField} className="form-control mb-1"/>
							</div>
							<br/>
							<div>
								<label htmlFor="firstName" className="grey-text">Your first name</label>
								<Field name="firstName" type="text" component={renderField} className="form-control mb-1"/>
							</div>
							<br/>
							<div>
								<label htmlFor="lastName" className="grey-text">Your last name</label>
								<Field name="lastName" type="text" component={renderField} className="form-control mb-1"/>
							</div>
							<br/>
							<div>
								<label htmlFor="password" className="grey-text">Your password</label>
								<Field name="password" type="password" component={renderField} className="form-control mb-1"/>
							</div>
							<br/>
							<div className="text-center mt-4">
								<p className='small'>Already have an account? Click <Link to='/login'>here</Link> to login</p>
								<button type="submit" className="btn btn-indigo">Sign Up</button>
							</div>
						</form>
					</Col>
				</Row>
			</Container>
			)
	}

}

export default reduxForm({
	form: 'register',
	validate,
})(connect(null, { signupRequest })(Signup))