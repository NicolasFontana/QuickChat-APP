import React from 'react'
import CurrentChat from './CurrentChat'
import Welcome from './Welcome'

function ChatContainer({ currentChat, currentUser, socket }) {
  return currentChat ? (
    <CurrentChat currentChat={currentChat} currentUser={currentUser} socket={socket} />
  ) : (
    <Welcome currentUser={currentUser} />
  )
}

export default ChatContainer