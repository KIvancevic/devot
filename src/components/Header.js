import React, { useState } from 'react'
import '../styles/header.css'
import logo from '../logoDevot.svg'
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const items = [
  {label: 'Trackers', icon: 'pi pi-fw pi-clock'},
  {label: 'History', icon: 'pi pi-fw pi-history'},
  {label: 'Logout', icon: 'pi pi-fw pi-power-off'}
];


export default function Header() {
  const [error, setError] = useState('')
  const  {currentUser, logout }  = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      navigate('/')
    } catch {
      setError('Failed to log out')
    }
  }

  return (
      <div className='container'>
        <img src={logo} className='appLogo' alt='logo' width={162} height={43.91}/>
        <TabMenu model={items}/>
        <Button onClick={handleLogout} label="Logout" icon="pi pi-fw pi-power-off"></Button>
        {error && <p>{error}</p>}
        <strong>Email:</strong> {currentUser.email}
      </div>
  )
}
