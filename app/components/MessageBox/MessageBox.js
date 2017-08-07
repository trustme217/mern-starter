import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { hideMessage } from 'App/actions/messages'
import Message from './Message'

const MessageBox = ({ messages, hideMessage }) => { // eslint-disable-line no-shadow
  const handleDismiss = (messageId) => {
    hideMessage(messageId)
  }

  return (
    <div>
      {messages.map(message => (
        <Message key={message.messageId} message={message} onDismiss={handleDismiss} />
      ))}
    </div>
  )
}

MessageBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  hideMessage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  messages: state.messages,
})

export default connect(mapStateToProps, { hideMessage })(MessageBox)
