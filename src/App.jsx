import React from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { Route } from './routes/Route'
function App() {

  return (
    <>
    <RouterProvider router={Route}></RouterProvider>
    </>
  )
}

export default App
