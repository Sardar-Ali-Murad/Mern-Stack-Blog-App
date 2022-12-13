import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Landing,Error,ProtectedRoute,Home,UploadBlog,Details} from  "./components/index.js"
import "./App.css"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/Home" element={
            <ProtectedRoute>
                <Home/>
            </ProtectedRoute>
          }/>
          <Route path="*" element={<Error/>}/>
          <Route path="/uploadBlog" element={<UploadBlog/>}/>
          <Route path="/blogDetails/:blogId" element={<Details/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
