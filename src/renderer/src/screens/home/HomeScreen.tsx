import React from 'react'
import { NavBar } from '@renderer/components/NavComponent/NavBar'
import { Route, Routes } from 'react-router-dom'
import { HomePDF } from '../PDF/HomePDF'
import { TestEditorHome } from '../TestEditor/TestEditorHome'
import { AddTest } from '../TestManager/AddTest'
import { TestManagerHome } from '../TestManager/TestManager'
import { AddClients } from '../clients/AddClients'
import { ClientsListHome } from '../clients/ClientsListHome'
import { AddUser } from '../users/AddUser'
import { UsersListHome } from '../users/UsersListHome'

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
        <Route path="/pdf" element={<HomePDF />} />
      </Routes>
    </div>
  )
}
