import React, { useState } from "react";
import "./AddProblemForm.css"; // Import your CSS file for styling

const AddProblemForm = () => {
  const [problemStatement, setProblemStatement] = useState("");
  const [options, setOptions] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [answer, setAnswer] = useState(""); // New state for answer

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://eval-rose.vercel.app/addProblem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemStatement,
          ...options,
          subject,
          level,
          answer, // Include the answer in the request body
        }),
      });
      const data = await response.json();
      console.log("Problem added:", data);
      alert("Problem added!!!");
      // Reset form fields after adding the problem
      setProblemStatement("");
      setOptions({
        option1: "",
        option2: "",
        option3: "",
        option4: "",
      });
      setSubject("");
      setLevel("");
      setAnswer(""); // Reset answer field
    } catch (error) {
      console.error("Error adding problem:", error);
    }
  };

  const handleOptionChange = (option, value) => {
    setOptions({ ...options, [option]: value });
  };

  return (
    <div className="add-problem-container">
      <h2>Add Problem</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Problem Statement:</label>
          <input
            type="text"
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
          />
        </div>
        {/* Input fields for options */}
        {[1, 2, 3, 4].map((num) => (
          <div key={`option${num}`} className="input-group">
            <label>{`Option ${num}:`}</label>
            <input
              type="text"
              value={options[`option${num}`]}
              onChange={(e) =>
                handleOptionChange(`option${num}`, e.target.value)
              }
            />
          </div>
        ))}
        <div className="input-group">
          <label>Subject:</label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">Select Subject</option>
            <option value="verbal">verbal</option>
            <option value="technical">technical</option>
            <option value="softskill">softskill</option>
            <option value="aptitude">aptitude</option>
          </select>
        </div>
        <div className="input-group">
          <label>Level:</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="">Select Level</option>
            <option value="easy">1</option>
            <option value="medium">2</option>
            <option value="hard">3</option>
          </select>
        </div>
        <div className="input-group">
          <label>Answer:</label>
          <select value={answer} onChange={(e) => setAnswer(e.target.value)}>
            <option value="">Select Answer</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Add Problem
        </button>
      </form>
    </div>
  );
};

export default AddProblemForm;
