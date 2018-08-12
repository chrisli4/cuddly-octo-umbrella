import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { ModalHeader, ModalBody, ModalFooter } from 'mdbreact'
import renderField from '../elements/field'
import validate from '../lib/validate'

let CustomForm = props => {
	const { handleSubmit } = props
	return (
		<form onSubmit={handleSubmit(values => {
			if(values.title && values.description)
				props.onSubmit({ ...values })
		})}>
			<ModalHeader className='default-color white-text text-capitalize justify-content-center'>
				<span>Create New {props.form}</span>
			</ModalHeader>
			<ModalBody>		
				<label htmlFor="title" className="grey-text font-weight-light">Title</label>
				<Field name="title" type="text" component={renderField} className="form-control mb-1"/>
				<br/>			
				<label htmlFor="description" className="grey-text font-weight-light">Description</label>
				<Field name="description" component={renderField} type="text" className='form-control'/>
				<br/>
			</ModalBody>
				<ModalFooter className='justify-content-center'>
					<button className='btn btn-default' type="submit">Submit</button>
				</ModalFooter>
			</form>
		)
}

export default reduxForm({ validate })(CustomForm)