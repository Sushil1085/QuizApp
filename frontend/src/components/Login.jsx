import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    // console.log(email,password);
    // console.log("snkdjsbh");

    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    
    const handleLogin=async(e)=>{
        e.preventDefault();
        
        if (!email && !password) {
            alert("Please enter both email and password.");
            return;
        }
        try{
            const res=await axios.post(BASE_URL+"/login",{email,password},{
                withCredentials:true})
                // console.log(res);
                
            if(res.data ==="Incorrect password" || res.data.message === "User not found!"){
              alert("Invalid email or password")
                
            }else{
              dispatch(addUser(res.data));
                localStorage.setItem("user", JSON.stringify(res.data));
                navigate("/dashboard");
            }
        }catch(err){
            console.error(err);
        }
    }
   

    return(
        <>
              <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input 
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                      type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input 
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                      type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                         
                      </div>
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button 
                    onClick={handleLogin}
                  type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 "><a href="#">Sign in</a></button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
  Are you an <span className="font-medium text-primary-600 dark:text-primary-500">Admin</span>?  
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      navigate("/signupadmin");
    }}
    className="ml-1 font-medium text-blue-600 hover:underline dark:text-blue-400"
  >
    Register here
  </a>
</p>

<p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
  Don’t have an account yet?  
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      navigate("/signupuser");
    }}
    className="ml-1 font-medium text-green-600 hover:underline dark:text-green-400"
  >
    Sign up
  </a>
</p>

              </form>
          </div>
      </div>
  </div>
</section>
        
        </>
    )
}

export default Login;