import React from 'react'
import { IoPower } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import styles from '../buttons.module.css'

function Logout() {
  const navigate = useNavigate()
  const handleClick = () => {
    localStorage.clear()
    navigate('/auth/login')
  }
  return (
    <div className={styles.buttonLogout} onClick={handleClick}>
      <IoPower />
    </div>
  )
}

export default Logout