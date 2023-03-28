import React from 'react'
import CurrentChat from './CurrentChat'
import Welcome from './Welcome'

function ChatContainer({ currentChat, currentUser }) {
  console.log(currentChat)
  return currentChat ? (
    <CurrentChat />
  ) : (
    <Welcome currentChat={currentChat} currentUser={currentUser} />
  )
}

export default ChatContainer