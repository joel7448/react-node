import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './dashboard';
import Loginpage from './loginpage';
import Signup from './signup';


function App() {

return(
<BrowserRouter>
<Routes>
<Route path='/' element={<Loginpage></Loginpage>} />
<Route path='/dashboard' element={<Dashboard></Dashboard>}/>
<Route path='/signup' element={<Signup></Signup>} />
</Routes>
</BrowserRouter>
)

}

export default App
