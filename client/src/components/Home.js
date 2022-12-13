import React from 'react'
import { useAppContext } from '../context/appContext'
import Headers from './Headers'
import Card from '@mui/material/Card';
import moment from "moment"
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import {Link} from "react-router-dom"
import Typography from '@mui/material/Typography';

const Home = () => {
  
  let array=["All","Education","Sports","Space","WebDevelopment"]
  let {AllBlogs,allBlogs, changeCategory,filterCategory,totalPages,totalBlogs,changepage,currentPage}=useAppContext()
  React.useEffect(()=>{
    AllBlogs()
  },[filterCategory,currentPage])

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    changepage(value)
  };
  return (
    <div>
      <div className='home__Image'></div>
      <Headers/>
      <div className='carosels'></div>


      <div className='blogs__Main section__padding' >
        <div>
          <h1 className='h__Cormorant'>{totalBlogs} Blogs Found</h1>

           {
             allBlogs?.map((all,i)=>{
              return (
                <Link key={i} to={`/blogDetails/${all._id}`}>

                <Card  className="home__Card" style={{cursor:"pointer"}} >
                 <img src={all.image} style={{width:"100%",borderRadius:"10px"}}/>
                 <h1 style={{fontSize:"30px"}}>{all.title}</h1>

                 <div style={{display:"flex",justifyContent:"space-between"}}>

                  <div style={{display:"flex"}}>
                    <img src={all.createdBy.image} style={{height:"30px",width:"30px",borderRadius:"50%",marginTop:"20px"}}/>
                    <p style={{fontSize:"20px",marginLeft:"10px",marginBottom:"20px"}}>{all.createdBy.name}</p>
                  </div>

                     <div>
                       <p className='home__Date'>{moment(all.createAt).format('MMMM d, YYYY')}</p>
                     </div>
                 </div>

                 <p>{all.description.slice(0,200)}...</p>

                 <Link to={`/blogDetails/${all._id}`}>
                     <Button variant="outlined" style={{marginLeft:"40%",marginTop:"30px"}}>See More</Button>
                 </Link>


              </Card>
          </Link>
            )
            })
          }
          <Pagination count={totalPages } page={page} onChange={handleChange} style={{marginLeft:"50px",marginBottom:"50px",marginTop:"60px"}} />
        </div>

        <div className='home__LeftSide' style={{width:"100%",marginTop:"57px",marginBottom:"40px"}}>
          <div style={{marginBottom:"20px"}}>
            <Card style={{padding:"20px"}}>
              <p style={{fontSize:"30px"}}>Recent Posts</p>
              <div style={{width:"70%",height:"3px",background:"gray",marginBottom:"20px"}}></div>
              {
                allBlogs.slice(0,3).map((recent,i)=>{
                  return (

                    <Link key={i} to={`/blogDetails/${recent._id}`}>
                    <div style={{display:"flex",marginBottom:"20px"}}>

                      <img src={recent.image} style={{width:"40px",height:"40px",borderRadius:"50%",marginRight:"20px"}}/>
                       <Typography  variant='paragraph' style={{fontSize:"20px",color:"gray"}}>{recent.title.slice(0,23)}...</Typography>
                    </div>
                    </Link>
                  
                  )
                })
              }
            </Card>


          </div>

          <div>

          <Card style={{padding:"17px",width:"100%"}}>
             <h1 className='h__Cormorant' style={{fontSize:"40px"}}>Categories</h1>
             <div >
                {array.map((all,i)=>{
                  return <Typography key={i} variant='h6' onClick={()=> changeCategory(all)} style={{paddingBottom:"20px",borderBottom:"2px solid green",cursor:"pointer",color:"gray"}}>{all}</Typography>
                })}
             </div>
          </Card>

          </div>
        </div>


      </div>

    </div>
  )
}

export default Home
