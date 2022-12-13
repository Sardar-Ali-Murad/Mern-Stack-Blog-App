import React from 'react'
import { useAppContext } from '../context/appContext'
import "./index.css"
import LogoutIcon from '@mui/icons-material/Logout';
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';

import Logo from "../Logo.png"
import Logout from "../Logout.png"
import AddIcon from '@mui/icons-material/Add';
const Headers = () => {
    let {user,logoutUser}=useAppContext()
  return (
    <div className='headers__Main'>
        <img src={Logo} className="logo" style={{height:"100px",width:"100px",borderRadius:"50%"}}></img>
        <div>
           <img src={user.image} style={{height:"100px",width:"100px",borderRadius:"50%",marginTop:"30px"}} ></img>
           <LogoutIcon onClick={()=>logoutUser()} fontSize='large' className='logout__Icon'/>
           <Link to="/uploadBlog">
              <Chip icon={<AddIcon />} style={{cursor:"pointer"}} label="Upload Bost" variant="outlined" className='upload__Icon' />
           </Link>

        </div>
    </div>
  )
}

export default Headers
