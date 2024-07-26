import { NavBar } from '@renderer/components/NavComponent/NavBar'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePDF } from '../PDF/HomePDF'
import { TestEditorHome } from '../TestEditor/TestEditorHome'
import { AddTest } from '../TestManager/AddTest'
import { TestManagerHome } from '../TestManager/TestManager'
import { AddClients } from '../clients/AddClients'
import { ClientsListHome } from '../clients/ClientsListHome'
import { AddUser } from '../users/AddUser'
import { UsersListHome } from '../users/UsersListHome'
import { HomeContainer } from './HomeContainer'
import { UserTransactionsCard } from '../TransactionDetails/UserTransactionsCard'

export const HomeScreen: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/users" element={<UsersListHome />} />
        <Route path="/users/form" element={<AddUser />} />
        <Route path="/customer" element={<ClientsListHome />} />
        <Route path="/customer/form" element={<AddClients />} />
        <Route path="/tests" element={<TestManagerHome />} />
        <Route path="/tests/add" element={<AddTest />} />
        <Route path="/tests/editor" element={<TestEditorHome />} />
        <Route path="/pdf" element={<HomePDF />} />
        <Route path="/caja" element={<UserTransactionsCard />} />
      </Routes>
    </div>
  )
}
