import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false }
  ]);

  // Fetch questions on load
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(BASE_URL + "/allquestions", { withCredentials: true });
        setQuestions(res.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Handle input change for question
  const handleQuestionChange = (e) => {
    setNewQuestion(e.target.value);
  };

  // Handle input change for options
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index].text = value;
    setNewOptions(updatedOptions);
  };

  // Handle selecting correct answer
  const handleCorrectOptionChange = (index) => {
    const updatedOptions = newOptions.map((option, i) => ({
      ...option,
      isCorrect: i === index
    }));
    setNewOptions(updatedOptions);
  };

  // Handle adding a new question
  const handleAddQuestion = async () => {
    if (!newQuestion.trim() || newOptions.some(opt => !opt.text.trim())) {
      alert("Please enter a question and all 4 options.");
      return;
    }

    try {
      const res = await axios.post(BASE_URL + "/addquestion", {
        questionText: newQuestion,
        options: newOptions
      }, { withCredentials: true });

      setQuestions([...questions, res.data]);
      setNewQuestion("");
      setNewOptions([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false }
      ]);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  // Handle deleting a question
  const handleDeleteQuestion = async (qIndex) => {
    const questionId = questions[qIndex]._id;

    try {
      await axios.delete(`${BASE_URL}/deletequestion/${questionId}`, { withCredentials: true });
      setQuestions(questions.filter((_, index) => index !== qIndex));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      
      {/* ADD QUESTION & OPTIONS SECTION */}
      <div className="mb-6 p-4 bg-gray-100 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Add New Question</h2>

        {/* Question Input */}
        <input
          type="text"
          value={newQuestion}
          onChange={handleQuestionChange}
          className="w-full p-2 border rounded-md mb-3"
          placeholder="Enter new question"
        />

        {/* Option Inputs (4 Options at a Time) */}
        {newOptions.map((option, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder={`Option ${index + 1}`}
            />
            <input
              type="radio"
              name="correctOption"
              checked={option.isCorrect}
              onChange={() => handleCorrectOptionChange(index)}
              className="w-5 h-5"
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 mt-2"
          onClick={handleAddQuestion}
        >
          Add Question with Options
        </button>
      </div>

      {/* QUESTION LIST */}
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-6 p-4 border rounded-lg bg-gray-50">
          {/* Question Title */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">{question.questionText}</h2>
            <button
              className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => handleDeleteQuestion(qIndex)}
            >
              Delete Question
            </button>
          </div>

          {/* OPTIONS LIST */}
          {question.options.map((option, oIndex) => (
            <div key={oIndex} className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-gray-900">{option.text}</span>
              {option.isCorrect && <span className="text-green-600 font-bold">✔ Correct</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuestionPage;
