import React from 'react'
import Dashboard from './widgets/Dashboard'

const Home = () => {
  return (
    <React.Fragment>
      <div className='w-full min-h-screen p-2'>
        <Dashboard />
      </div>
    </React.Fragment>
  )
}

export default Home