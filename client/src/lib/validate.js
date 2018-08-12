const validate = values => {
	const errors = {}
	if (!values.username) {
		errors.username = 'Username Required'
	}
	if (!values.password) {
		errors.password = 'Password Required'
	}
	if (!values.email) {
		errors.email = 'Email Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}
	if (!values.title) {
		errors.title = 'Title Required'
	}
	if (!values.description) {
		errors.description = 'Description Required'
	}
	return errors
}

export default validate