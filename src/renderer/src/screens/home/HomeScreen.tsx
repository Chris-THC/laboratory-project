import { NavBar } from '@renderer/components/NavComponent/NavBar'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserAdmin } from '../clients/UserAdmin'
import { UserEmployee } from '../clients/UserEmployee'
import { AddUser } from '../users/AddUser'
import { UsersListHome } from '../users/UsersListHome'

export const HomeScreen: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<UserAdmin />} />
        <Route path="/employee" element={<UserEmployee />} />
        <Route path="/users" element={<UsersListHome />} />
        <Route path="/users/form" element={<AddUser />} />

        {/* Here you can add new screens */}
        {/* <Route path="/add/task" element={<AddTask />} /> */}
      </Routes>
    </div>
  )
}
