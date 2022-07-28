import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { config } from './config';
import { useNavigate } from 'react-router-dom';


function Dashboard(){

    const [users,setusers]=useState([])
    const [edit,setedit] = useState(false);
    const [id,setid] = useState({});
    
    
    const fetchdata = async()=>{
      try{
        
      let info = await axios.get(`${config.api}/students`,{
        headers : {
          'Authorization' : `${localStorage.getItem('react_token')}` 
        }
      })
      
      setusers(info.data);

      
    
      }
      catch(error){
        console.log(error)
      }
    }
    
    useEffect(()=>{
      fetchdata();
    },[]);
    
    const handleedit=async (id)=>{
      try{
     let studentedit = await axios.get(`${config.api}/students/${id}`,{
      headers : {
        'Authorization' : `${localStorage.getItem('react_token')}` 
      }
    })
     formik.setValues(studentedit.data)
     setid(studentedit.data);
     setedit(true);
    }
     catch(error){
      console.log(error);
     }
    }
    
    const handledelete =async(id)=>{
    await axios.delete(`${config.api}/student/${id}`,{
      headers : {
        'Authorization' : `${localStorage.getItem('react_token')}` 
      }
    });
    fetchdata();
    
    }
    const navigation = useNavigate();
    const logout = ()=>{
      localStorage.removeItem('react_token')
      navigation('/')
    }

    const formik = useFormik({
      initialValues : {
        email : "",
        password: ""
      },
      onSubmit :async(values) => {
        try{
          if(!edit) 
          {
    await axios.post("http://localhost:3000/student",values,{
      headers : {
        'Authorization' : `${localStorage.getItem('react_token')}` 
      }
    });
    fetchdata();
          }
          else if(edit){
            delete values._id;  //since _id  in mongodb is a immnutable key:value pair
            await axios.put(`http://localhost:3000/students/${id._id}`,values,{
              headers : {
                'Authorization' : `${localStorage.getItem('react_token')}` 
              }
            });

            setedit(false);
            fetchdata();

          }
        }
        catch(error){
          console.log(error);
        }
      }
    })
    
    
      return (
       <div className='row mt-2'>
        <div className='col-lg-12'>
        <div className='btn btn-danger' onClick={()=>{logout()}}>Logout</div></div>
        <div className='col-lg-6'>
           <form onSubmit={formik.handleSubmit}>
    <div className='container'>
    
      <div className='p-2'>
    <input type="text" placeholder='Email' name = "email" onChange={formik.handleChange} value={formik.values.email} ></input>
    </div>
    <div className='p-2'>
    <input type="text" placeholder='password' name = "password" onChange={formik.handleChange} value={formik.values.password}></input>
    </div>
    
    <input type="submit" value="Submit" className='btn btn-outline-primary m-3'></input>
    
    
    </div>
    </form>
    
        </div>
        <div className='col-lg-6'>
    <div className='container'>
    <table class="table table-striped">
    <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">password</th>
          <th scope='col'>Action</th>
        
        </tr>
      </thead>
      <tbody>
       {
        users.map((user,index)=>{
          return (<tr>
            <th scope='row'>{index+1}</th>
            <th>{user.email}</th>
            <th>{user.password}</th>
            <th><button className='btn btn-info' onClick={()=>{handleedit(user._id)}}>Edit</button> <button className='btn btn-danger' onClick={()=>{handledelete(user._id)}}>Delete</button></th>
          </tr>
          )
        })
       }
       </tbody>
    </table>
      
      </div></div>
    
    
       </div>
      );

}

export default Dashboard ; 