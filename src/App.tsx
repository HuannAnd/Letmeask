import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home/Home'
import { NewRoom } from './pages/NewRoom/NewRoom'

import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from './pages/Room/Room'
import { AdminRoom } from './pages/AdminRoom/AdminRoom'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/rooms" element={<NewRoom />} />
          <Route path='/rooms/:id' element={<Room />}/>

          <Route path='/admin/:id' element={<AdminRoom />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>

  )
}

export default App
