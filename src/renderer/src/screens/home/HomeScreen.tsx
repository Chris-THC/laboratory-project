import { NavBar } from '@renderer/components/NavComponent/NavBar'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
<<<<<<< HEAD

import { AddUser } from '../users/AddUser'
import { UsersListHome } from '../users/UsersListHome'
import { AddClients } from '../clients/AddClients'
=======
import { UserAdmin } from '../clients/UserAdmin'
import { UserEmployee } from '../clients/UserEmployee'
import { AddUser } from '../users/AddUser'
import { UsersListHome } from '../users/UsersListHome'
>>>>>>> 12ae55fe847d822a403937460ccae1de40c83a8f

export const HomeScreen: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Routes>
<<<<<<< HEAD
        <Route
          path="/"
          element={
            <div>
              <h1>Home</h1>
            </div>
          }
        />
        <Route path="/users" element={<UsersListHome />} />
        <Route path="/users/form" element={<AddUser />} />
        <Route path="/customer/customer" element={<AddClients />} />
=======
        <Route path="/" element={<UserAdmin />} />
        <Route path="/employee" element={<UserEmployee />} />
        <Route path="/users" element={<UsersListHome />} />
        <Route path="/users/form" element={<AddUser />} />
>>>>>>> 12ae55fe847d822a403937460ccae1de40c83a8f

        {/* Here you can add new screens */}
        {/* <Route path="/add/task" element={<AddTask />} /> */}
      </Routes>
    </div>
  )
}
