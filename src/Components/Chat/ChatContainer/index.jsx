import React from 'react'
import CurrentChat from './CurrentChat'
import Welcome from './Welcome'

function ChatContainer({ currentChat }) {
  console.log(currentChat)
  return currentChat ? (
    <CurrentChat />
  ) : (
    <Welcome />
  )
}

export default ChatContainer