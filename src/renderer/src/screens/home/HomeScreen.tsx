import { NavBar } from '@renderer/components/NavComponent/NavBar'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { AddUser } from '../users/AddUser'
import { UsersListHome } from '../users/UsersListHome'
import { AddClients } from '../clients/AddClients'
import { ClientsListHome } from '../clients/ClientsListHome'
import { TestManagerHome } from '../TestManager/TestManager'
import { TestEditorHome } from '../TestEditor/TestEditorHome'
import { HepatitisAPDF } from '@renderer/PDF/Hepatitis-A-PDF/HepatitisAPDF'
import { AddTest } from '../TestManager/AddTest'

export const HomeScreen: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Routes>
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
        <Route path="/customer" element={<ClientsListHome />} />
        <Route path="/customer/form" element={<AddClients />} />
        <Route path="/tests" element={<TestManagerHome />} />
        <Route path="/tests/add" element={<AddTest />} />
        <Route path="/tests/editor" element={<TestEditorHome />} />
        <Route path="/pdf/render" element={<HepatitisAPDF />} />

        {/* Here you can add new screens */}
        {/* <Route path="/add/task" element={<AddTask />} /> */}
      </Routes>
    </div>
  )
}
