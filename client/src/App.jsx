import { RouterProvider } from 'react-router'
import { router } from './constants/router/router'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
      <ToastContainer/>
    </div>
  )
}

export default App
