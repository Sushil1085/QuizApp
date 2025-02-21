import { useEffect, useState } from "react";
import QuizCards from "./QuizCards";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";

const Dashboard=()=>{
    const [quizCards,setQuizCards]=useState([]);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const user=useSelector((state)=>state.user);
    // console.log(user?.user?.role);


    let isAdmin = user?.user?.role === "admin";
    let isUser = user?.user?.role === "user";

    

    useEffect(()=>{
        const getData=async()=>{
            const res=await axios.get(BASE_URL+"/allquiz",{
                withCredentials:true})
                setQuizCards(res.data);      
        }
        getData();
    },[])

    const handleLogout=async(e)=>{
        e.preventDefault();
        const res=await axios.post(BASE_URL+"/logout",{},{withCredentials:true})
            if(res){
            dispatch(removeUser());
            localStorage.removeItem("user");
            navigate("/");
            }
    }
    

    return(
        <>
        
       {/* Dashboard Title */}
<h1 className="flex justify-center text-3xl font-bold underline">
    {isAdmin ? "Admin Dashboard" : "User Dashboard"}
</h1>

{/* Button Container in One Row */}
{isAdmin && (
    <div className="flex justify-end space-x-4 my-5">
        <button
            type="button"
            onClick={handleLogout}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
            Log Out
        </button>

        <button
            type="button"
            onClick={() => navigate("/quizadd")}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
            +Add Quiz
        </button>

        <button
            type="button"
            onClick={() => navigate("/scorecard")}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
            Score Of Users
        </button>
    </div>
)}

{isUser && (
    <div className="flex justify-end space-x-4 my-5">
    <button
        type="button"
        onClick={handleLogout}
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
    >
        Log Out
    </button>
    </div>
)}

           <QuizCards quizCards={quizCards} 
                      isUser={isUser}
                      isAdmin={isAdmin}
           />

            
        </>
    )
}

export default Dashboard;