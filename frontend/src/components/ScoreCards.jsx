import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const ScoreCards = () => {
    const [scoreCards,setScoreCards]=useState([]);


    useEffect(()=>{
        const getData=async()=>{
            const res=await axios.get(BASE_URL+"/scoreboard",{
                withCredentials:true})
                setScoreCards(res.data);
                console.log(res.data);
                
            }
                getData();
    },[])

    return (
        <>
        <div className="flex justify-center mt-9">
<h2 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-gray">Scorecard</h2>
</div>
<div className="flex justify-center mt-5">
<div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">User</h5>
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Score <p class="text-sm text-gray-500 truncate dark:text-gray-400">(Quiz)</p></h5>
   </div>
   <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
    {scoreCards && scoreCards.map((cards)=>(
            <li class="py-3 sm:py-4">
                <div class="flex items-center">
                    
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {cards?.userId?.fullName}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        {cards?.userId?.email}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {cards?.score} <p class="text-sm text-gray-500 truncate dark:text-gray-400">({cards?.quizId?.title})</p>
                    </div>
                </div>
            </li>
        ))}
        </ul>
   </div>
</div>
</div>
        </>
    )
}

export default ScoreCards;