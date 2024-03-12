import { NavBar } from '@renderer/components/NavComponent/NavBar'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { AddUser } from '../users/AddUser'
import { UsersListHome } from '../users/UsersListHome'
import { AddClients } from '../clients/AddClients'
import { ClientsListHome } from '../clients/ClientsListHome'
import { ScreenPresentation } from './ScreenPresentation'

export const HomeScreen: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<ScreenPresentation />} />
        <Route path="/users" element={<UsersListHome />} />
        <Route path="/users/form" element={<AddUser />} />
        <Route path="/customer" element={<ClientsListHome />} />
        <Route path="/customer/form" element={<AddClients />} />

        {/* Here you can add new screens */}
        {/* <Route path="/add/task" element={<AddTask />} /> */}
      </Routes>
    </div>
  )
}
