import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserAdmin } from '../clients/UserAdmin'
import { UserEmployee } from '../clients/UserEmployee'
import { NavBar } from '@renderer/components/NavComponent/NavBar'
export const HomeScreen: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<UserAdmin />} />
        <Route path="/employee" element={<UserEmployee />} />
        {/* Here you can add new screens */}
        {/* <Route path="/add/task" element={<AddTask />} /> */}
      </Routes>
    </div>
  )
}
