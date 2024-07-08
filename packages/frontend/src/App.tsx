/// <reference types="vite-plugin-svgr/client" />
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from 'router'

export const queryClient = new QueryClient()
function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  )
}

export default App
