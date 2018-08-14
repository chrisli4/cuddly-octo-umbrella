import React from 'react';
import CustomError from './error'

const renderField = ({ input, label, type, className, meta: { touched, error } }) => (
    <div>
      <input {...input} type={type} className={className}/>
      {touched && (error && <CustomError error={error} />)}
    </div>
)

export default renderField