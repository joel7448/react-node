import { Link, useNavigate } from "react-router-dom"
import {useFormik} from 'formik'
import axios from "axios"
import { config } from "./config"
function Loginpage(){
const navigation = useNavigate();
const formik = useFormik({
  initialValues:{
    email:"",
    password:""
  },
  onSubmit:async(values)=>{
    try{
   const login = await axios.post(`${config.api}/login`,values);
console.log(login);
console.log("hii");
   localStorage.setItem("react_token",login.data.token)
   navigation("/dashboard")

    }
    catch(error){
      console.log(error);
    }
  }
})

return (
    <div className='row mt-2'>
    <div className='col-lg-6'>
       <form onSubmit={formik.handleSubmit} >
<div className='container'>

  <div className='p-2'>
<input type="text" placeholder='Email' name="email" value={formik.values.email} onChange={formik.handleChange} ></input>
</div>
<div className='p-2'>
<input type="text" placeholder='password' name="password" value={formik.values.password} onChange={formik.handleChange} ></input>
</div>

<input type="submit" value="Submit" className='btn btn-outline-primary m-3'></input>


</div>
</form>
<Link to = "/signup">Signup</Link>

</div></div>
)





}

export default Loginpage;