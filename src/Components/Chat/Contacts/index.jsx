import React, { useState } from 'react'
import styles from './index.module.css'
import Logo from "assets/logo-removebg-preview.png";
import Logout from "Components/Shared/Button/Logout"

function Contacts({ contacts, currentUser, setCurrentChat }) {
  const [currentSelected, setCurrentSelected] = useState(undefined)
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    setCurrentChat(contact)
  }
  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <img src={Logo} alt="Logo QuickChat" />
        <h1>QuickChat</h1>
      </div>
      <div className={styles.contacts}>
        {contacts.map((contact, index) => {
          return (
              <div className={`${styles.contact} ${index === currentSelected ? styles.selected : ''}`} key={index} onClick={() => changeCurrentChat(index, contact)}>
                <div className={styles.avatar}>
                  <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt={`${contact.username}'s avatar`} />
                </div>
                <div className={styles.username}>
                  <h3>{contact.username}</h3>
                </div>
              </div>
            )
        })}
      </div>
      <div className={styles.currentUser}>
        <div className={styles.avatar}>
          <img src={`data:image/svg+xml;base64,${currentUser?.avatarImage}`} alt={`${currentUser?.username}'s avatar`} />
        </div>
        <div className={styles.username}>
          <h2>{currentUser?.username}</h2>
        </div>
        <Logout />
      </div>
    </div>
  )
}

export default Contacts