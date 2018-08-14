
import React, { PropTypes } from 'react'

// Iterate over each message object and print them
// in an unordered list
const Messages = ({ messages, onClick }) => 
   (
    <div className="alert alert-success w-75" role="alert">
        {messages.map(message => (
          <span key={message.time}>
              <button type="button" className="close" aria-label="Close" onClick={() => onClick()}>
               <span aria-hidden="true">&times;</span>
              </button>
          <strong>{message.body}</strong>
          </span>
        ))}
    </div>
  )



export default Messages