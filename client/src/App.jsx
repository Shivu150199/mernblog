
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import About from './pages/About'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Projects from './pages/Projects'
import Signin from './pages/Sign-in'
import Singup from './pages/Sign-ups'
import Home from './pages/Home'
import Header from './component/Header'

function App() {
  

  return (
    <BrowserRouter>
    <Header/>
<Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/about" element={<About />} />
  <Route path="/dashboard" element={<Dashboard/>} />
  <Route path="/sign-up" element={<Singup/>} />
  <Route path="/sign-in" element={<Signin/>} />
  <Route path="/project" element={<Projects/>} />
  <Route path="*" element={<NotFound />} />
</Routes>


    </BrowserRouter>
  )
}

export default App
