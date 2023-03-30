import React from 'react'
import CurrentChat from './CurrentChat'
import Welcome from './Welcome'

function ChatContainer({ currentChat, currentUser }) {
  return currentChat ? (
    <CurrentChat currentChat={currentChat} currentUser={currentUser} />
  ) : (
    <Welcome currentUser={currentUser} />
  )
}

export default ChatContainer