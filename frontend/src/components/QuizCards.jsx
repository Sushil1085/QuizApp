const QuizCards=({quizCards})=>{

    
    return(
        <>
<div className="flex flex-wrap">
            {quizCards.map((cards)=>{
            return(
            <div className="w-full sm:w-1/3 md:w-1/4 my-15 mx-5">
            <a class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{cards.title}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">{cards.description}</p>
            <p class="font-normal text-gray-700 dark:text-gray-400">Time:{cards.timer}</p>
            <div className="flex justify-end dark:hover:bg-gray-700">
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Questions</button>
            </div>
            </a>
            </div>
        )})}
         </div>
        </>
    )
}

export default QuizCards;