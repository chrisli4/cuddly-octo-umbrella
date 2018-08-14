import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CustomError = ({ error }) => (
	<span style={{color: '#700', fontWeight: 'bold'}}><FontAwesomeIcon className='mr-2' icon='exclamation-circle'/>{error}</span>
)

export default CustomError