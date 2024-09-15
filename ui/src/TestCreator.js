import React, { useState, useEffect } from "react";

const TestCreator = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [testOptions, setTestOptions] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");

  useEffect(() => {
    // Fetch test options when the component mounts
    fetchTestOptions();
  }, []);

  useEffect(() => {
    // Fetch all questions from the server when subject, level, or selectedTest changes
    fetchProblems();
  }, [selectedSubject, selectedLevel, selectedTest]);

  const fetchTestOptions = async () => {
    try {
      const response = await fetch("https://eval-rose.vercel.app/loadTests", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch test options. Status: ${response.status}`
        );
      }

      const data = await response.json();
      setTestOptions(data);
    } catch (error) {
      console.error("Error fetching test options:", error.message);
    }
  };

  const fetchProblems = async () => {
    try {
      // Check if both dropdowns have valid selections and a test is selected
      if (
        selectedLevel !== "" &&
        selectedSubject !== "" &&
        selectedTest !== ""
      ) {
        const response = await fetch("https://eval-rose.vercel.app/loadProblems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: selectedSubject,
            level: selectedLevel,
            testId: selectedTest,
          }),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch problems. Status: ${response.status}`
          );
        }

        const data = await response.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error("Error fetching questions:", error.message);
    }
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleTestChange = (event) => {
    setSelectedTest(event.target.value);
  };

  const handleCheckboxChange = (questionId) => {
    // Toggle the selection of the checkbox
    setSelectedQuestions((prevSelectedQuestions) => {
      if (prevSelectedQuestions.includes(questionId)) {
        // If already selected, remove from the array
        return prevSelectedQuestions.filter((id) => id !== questionId);
      } else {
        // If not selected, add to the array
        return [...prevSelectedQuestions, questionId];
      }
    });
  };

  const handleUpdateTest = async () => {
    try {
      // Check if a test is selected and questions are selected
      if (selectedTest !== "" && selectedQuestions.length > 0) {
        const response = await fetch("https://eval-rose.vercel.app/updateTest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            testId: selectedTest,
            questionIds: selectedQuestions,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to update test. Status: ${response.status}`);
        }

        // Add any additional logic or update UI as needed after a successful update
        console.log("Test updated successfully");
        alert("Test updated successfully");
      }
    } catch (error) {
      console.error("Error updating test:", error.message);
    }
  };

  return (
    <div>
      <h2>Questions List</h2>
      <div>
        <label htmlFor="levelDropdown">Level:</label>
        <select
          id="levelDropdown"
          value={selectedLevel}
          onChange={handleLevelChange}
        >
          <option value="">Select Level</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div>
        <label htmlFor="subjectDropdown">Subject:</label>
        <select
          id="subjectDropdown"
          value={selectedSubject}
          onChange={handleSubjectChange}
        >
          <option value="">Select Subject</option>
          <option value="softskill">Soft Skill</option>
          <option value="technical">Technical</option>
          <option value="aptitude">Aptitude</option>
          <option value="verbal">Verbal</option>
        </select>
      </div>
      <div>
        <label htmlFor="testDropdown">Select Test:</label>
        <select
          id="testDropdown"
          value={selectedTest}
          onChange={handleTestChange}
        >
          <option value="">Select Test</option>
          {testOptions.map((test) => (
            <option key={test._id} value={test._id}>
              {`Test ${testOptions.indexOf(test) + 1}`}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <div>
              <strong>Subject:</strong> {question.subject}
            </div>
            <div>
              <strong>Level:</strong> {question.level}
            </div>
            <div>
              <strong>Question:</strong> {question.problemStatement}
            </div>
            <ul>
              <li>{question.option1}</li>
              <li>{question.option2}</li>
              <li>{question.option3}</li>
              <li>{question.option4}</li>
            </ul>
            <label>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(question._id)}
                checked={selectedQuestions.includes(question._id)}
              />
              Select
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleUpdateTest}>Update Test</button>
    </div>
  );
};

export default TestCreator;
