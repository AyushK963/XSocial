import { Routes,Route  } from 'react-router-dom';

import SigninForm from './_auth/forms/SigninForm';
import AuthLayout from './_auth/AuthLayout';
import SignupForm from './_auth/forms/SignupForm';
import Rootlayout from './_root/Rootlayout';
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';

import './globals.css';
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
       <main className='flex h-screen'>
        <Routes>
            {/* public routes */} 
            <Route element={<AuthLayout/>}>
                <Route path="/sign-up" element={<SignupForm />}/>
                <Route path="/sign-in" element={<SigninForm />}/>
            </Route>
 
            {/* private routes */}
            <Route element={<Rootlayout/>}>
                <Route index element={<Home />}/>
                <Route path="/explore" element={<Explore />}/>
                <Route path="/saved" element={<Saved />}/>
                <Route path="/all-users" element={<AllUsers />}/>
                <Route path="/update-post/:id" element={<EditPost />}/>
                <Route path="/posts/:id" element={<PostDetails />}/>
                <Route path="/profile/:id/*" element={<Profile />}/>
                <Route path="/update-profile/:id" element={<UpdateProfile />}/>
                <Route path="/create-post" element={<CreatePost />}/>

            </Route>
        </Routes>
        
        <Toaster/>
       </main>
  )
}

export default App
