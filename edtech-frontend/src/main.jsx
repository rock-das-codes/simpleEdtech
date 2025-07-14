import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route  } from "react-router";

import './index.css'
import EdTechLandingPage from './App.jsx'
import store from './stores/store.js'
import { Provider } from 'react-redux'
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ProtectedRoute from './components/Restricted.jsx';
import ExploreCourses from './components/Explore.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<EdTechLandingPage />} />
      <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route element={<ProtectedRoute />}> */}
                    <Route path="/dashboard" element={<Dashboard />} />
                {/* </Route> */}
         <Route path="/explore" element={<ExploreCourses/>}/>    
    </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
