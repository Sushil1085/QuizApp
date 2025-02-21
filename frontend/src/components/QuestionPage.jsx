import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false }
  ]);
  const[load,setLoad]=useState(false);

  const user=useSelector(state=>state.user);
  let isAdmin = user?.user?.role === "admin";


  const {id}=useParams();
  const navigate=useNavigate();
  // console.log("dhjdsv"+id);
  

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(BASE_URL + "/allquestions/"+id, { withCredentials: true });
        
        console.log("API Response:", res.data);


        if (Array.isArray(res.data)) {
          setQuestions(res.data); 
          console.log(res.data);
          
        } else {
          console.error("Invalid response format, expected an array:", res.data);
          setQuestions([]); 
        }
        
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([]);
      }
    };

    if (id) fetchQuestions();
  }, [load,id]);


  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index].text = value;
    setNewOptions(updatedOptions);
  };

  const handleCorrectOptionChange = (index) => {
    const updatedOptions = newOptions.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    setNewOptions(updatedOptions);
  };


  const handleAddQuestion = async () => {
    if (!newQuestion.trim() || newOptions.some(opt => !opt.text.trim())) {
      alert("Please enter a question and all 4 options.");
      return;
    }

    try {
      const res = await axios.post(BASE_URL + "/addquestion/"+id, {
        questionText: newQuestion,
        options: newOptions
      }, { withCredentials: true });

      console.log("Question Added Response:", res.data);

      
      if (res.data && res.data.questionText) {
        setLoad(!load);
        setQuestions(prevQuestions => [...prevQuestions, res.data]);
      } else {
        console.error("Invalid response data:", res.data);
      }


      setNewQuestion("");
      setNewOptions([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false }
      ]);
      setLoad(!load);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleDeleteQuiz =async () => {
    try {
      const res = await axios.delete(BASE_URL + "/deletequiz/"+id, { withCredentials: true });
      if(res){
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const res = await axios.delete(BASE_URL + "/deletequestion/"+questionId, { withCredentials: true });
      if(res){
        setLoad(!load);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      {questions?.length > 0 ? <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray"> Quiz Name- {questions[0].quizId.title}</h5>: "No Title Available"}

      <div className="flex justify-end">
<button type="button" 
onClick={handleDeleteQuiz}
class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete Quiz</button>
</div>
      {isAdmin && (
      <div className="mb-6 p-4 bg-gray-100 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Add New Question</h2>

        <input
          type="text"
          className="w-full p-2 border rounded-md mb-3"
          placeholder="Enter new question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />

        {newOptions.map((option, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder={`Option ${index + 1}`}
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            <input
              type="radio"
              name="correctOption"
              className="w-5 h-5"
              checked={option.isCorrect}
              onChange={() => handleCorrectOptionChange(index)}
            />
          </div>
        ))}
        

        <button
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 mt-2"
          onClick={handleAddQuestion}
        >
          Add Question with Options
        </button>
      </div>
      )}

      {Array.isArray(questions) && questions.length > 0 ? (
  questions.map((question, qIndex) => (
    <div key={qIndex} className="mb-6 p-4 border rounded-lg bg-gray-50">
      <div className="flex justify-end">
      <button type="button" 
        onClick={()=>handleDeleteQuestion(question._id)}
      class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete Question</button>
      </div>
      <h2 className="text-xl font-semibold text-gray-900">{question.questionText}</h2>
      {Array.isArray(question.options) && question.options.map((option, oIndex) => (
        <div key={oIndex} className="flex items-center justify-between p-3 border rounded-lg">
          <span className="text-gray-900">{option.text}</span>
          {option.isCorrect && <span className="text-green-600 font-bold">✔ Correct</span>}
        </div>
      ))}
    </div>
  ))
) : (
  <p>No questions available. Add a new question!</p>
)}

      {/* {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">{question.questionText}</h2>
            <button
              className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
            >
              Delete Question
            </button>
          </div>

          {question.options.map((option, oIndex) => (
            <div key={oIndex} className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-gray-900">{option.text}</span>
              {option.isCorrect && <span className="text-green-600 font-bold">✔ Correct</span>}
            </div>
          ))}
        </div>
      ))} */}
    </div>
  );
};

export default QuestionPage;
