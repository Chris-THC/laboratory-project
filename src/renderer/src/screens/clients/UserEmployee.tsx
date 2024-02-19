import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
export const UserEmployee: React.FC = () => {
  return (
    <div>
      <h2>Employee</h2>
      <p>This is employee page</p>
      <Button variant={'destructive'}>
        <Link to={'/'}>Back Home</Link>
      </Button>
    </div>
  )
}
