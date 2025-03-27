import { RouterProvider } from 'react-router'
import { router } from './constants/router/router'
import { Slide, ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className='font-montserrat'>
      <RouterProvider router={router}/>
      <ToastContainer
position="bottom-right"
autoClose={2000}
limit={1}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Slide}
/>
    </div>
  )
}

export default App
