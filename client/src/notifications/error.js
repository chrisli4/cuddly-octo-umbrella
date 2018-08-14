import React, { PropTypes } from 'react'

// Iterate over each error object and print them
// in an unordered list
const Errors = ({ errors, onClick }) =>
 (
    <div className="alert alert-danger w-75 justify-content-center" role="alert">
        {errors.map(error => (
          <div className='mx-auto' key={error.time}>
          <button type="button" className="close" aria-label="Close" onClick={() => onClick()}>
          <span aria-hidden="true">&times;</span>
        </button>

          <strong>{error.body} {error.error}</strong>
          </div>
        ))}
    </div>
  )


export default Errors