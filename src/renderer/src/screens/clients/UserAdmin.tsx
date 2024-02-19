import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

export const UserAdmin: React.FC = () => {
  return (
    <div>
      <h2>Admin screen</h2>
      <p>This is admim page</p>
      <Button variant={'default'}>
        <Link to={'/employee'}>Go to Employee screen</Link>
      </Button>
    </div>
  )
}
