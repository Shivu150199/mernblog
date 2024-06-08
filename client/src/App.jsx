
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import About from './pages/About'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Projects from './pages/Projects'
import Signin from './pages/Sign-in'
import Singup from './pages/Sign-ups'
import Home from './pages/Home'
import Header from './component/Header'
import Fotter from './component/Fotter'
  import { ToastContainer, toast } from 'react-toastify'

  import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './component/PrivateRoute'
import CreatePost from './pages/CreatePost'
import AdminPrivateRoute from './component/AdminPrivateRoute'
import UpdatePost from './pages/Update'
import PostPage from './pages/PostPage'
import ScrollToTop from './component/ScrollToTop'

function App() {
  

  return (
    <BrowserRouter>
    <ScrollToTop/>
      <ToastContainer autoClose={2000} pauseOnHover={false} />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute/>}>

        <Route path="/dashboard" element={<Dashboard />} />

        </Route>
<Route element={<AdminPrivateRoute/>}>

<Route path='/create-post' element={<CreatePost/>}/>
<Route path='/update-post/:postId' element={<UpdatePost/>}/>
</Route>

        <Route path="/sign-up" element={<Singup />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/post/:postSlug" element={<PostPage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Fotter />
    </BrowserRouter>
  )
}

export default App
