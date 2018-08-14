import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { CardHeader, CardBody, CardFooter, Row } from 'mdbreact'
import renderField from '../elements/field'
import validate from '../lib/validate'

let CustomForm = props => {
	const { handleSubmit } = props
	return (
		<form onSubmit={handleSubmit(values => {
			if(values.title && values.description)
				props.onSubmit({ ...values })
		})}>
			<CardHeader className='default-color white-text text-capitalize text-center'>
				<span className='h2-responsive'>Create New {props.form}</span>
			</CardHeader>
			<CardBody>		
				<label htmlFor="title" className="grey-text font-weight-light">Title</label>
				<Field name="title" type="text" component={renderField} className="form-control mb-1"/>
				<br/>			
				<label htmlFor="description" className="grey-text font-weight-light">Description</label>
				<Field name="description" component={renderField} type="text" className='form-control'/>
				<br/>
			</CardBody>
				<CardFooter>
					<Row className='justify-content-center'>
						<button className='btn btn-default' type="submit">Submit</button>
					</Row>
				</CardFooter>
			</form>
		)
}

export default reduxForm({ validate })(CustomForm)