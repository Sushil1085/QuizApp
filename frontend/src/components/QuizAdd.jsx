import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import{useNavigate} from "react-router-dom";

const QuizAdd=()=>{
    const navigate=useNavigate();

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [timer,setTimer]=useState(0);

    const handleQuizAdd=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post(BASE_URL+"/addquiz",{title,description,timer},{withCredentials:true});
            if(res){
                navigate("/dashboard");
            }
        }catch(err){
            console.error(err);
        }
    }
    // console.log(title);
    
    return(
        <>        
<form class="max-w-sm mx-auto" onSubmit={handleQuizAdd}>
  <div class="mb-5 mt-45">

  <div className="flex justify-center m-4" >
<h1 class="text-5xl font-extrabold dark:text-white"><small class="ms-2 font-semibold text-gray-500 dark:text-gray-400">Add Quiz Here</small></h1>
        </div>

      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Title</label>
      <input type="text"
        onChange={(e)=>setTitle(e.target.value)}
        value={title}
      id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  
      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Description</label>
      <input type="text" 
        onChange={(e)=>setDescription(e.target.value)}
        value={description}
      id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Timer</label>
      <input type="text" 
        onChange={(e)=>setTimer(e.target.value)}
        value={timer}
      id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

<div className="flex justify-center m-5">
<button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</div>
  </div>
</form>

        </>
    )
}

export default QuizAdd;