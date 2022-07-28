import { Link } from "react-router-dom"
import { useFormik } from "formik";
import { config } from "./config";
import axios from "axios"

function Signup(){
const formik = useFormik({
  initialValues : {
    username : "",
    email:"",
    password:""
  },
  onSubmit: async(values) =>{
try{
const register = await axios.post(`${config.api}/register`,values);
alert(register.data.message)
}
catch(err){
  console.log(err)
}

  }
})


    return ( <form onSubmit={formik.handleSubmit} >
        <div className='container'>
        
          <div className='p-2'>
        <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange}  placeholder='Username'  ></input>
        </div>
        <div className='p-2'>
        <input type="text" placeholder='Email'  name="email" value={formik.values.email} onChange={formik.handleChange} ></input>
        </div>
        <div className='p-2'>
        <input type="text" placeholder='Password'  name="password" value={formik.values.password} onChange={formik.handleChange} ></input>
        </div>
        
        <input type="submit" value="Submit" className='btn btn-outline-primary m-3'></input>
        
        
        </div>
        
        <p>Already have a account?<Link to="/">Login</Link></p>
        </form>)
}
export default Signup;