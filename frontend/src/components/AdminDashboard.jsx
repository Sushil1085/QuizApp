import { useEffect, useState } from "react";
import QuizCards from "./QuizCards";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const AdminDashboard=()=>{
    const [quizCards,setQuizCards]=useState([]);

    useEffect(()=>{
        const getData=async()=>{
            const res=await axios.get(BASE_URL+"/allquiz",{
                withCredentials:true})
                setQuizCards(res.data);      
        }
        getData();
    },[])
    

    return(
        <>
           <QuizCards quizCards={quizCards} />
        </>
    )
}

export default AdminDashboard;