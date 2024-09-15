// Tests.js
import React, { useState, useEffect, useReducer } from "react";
import "./Tests.css"; // Import the CSS file for styling

const Tests = ({ userId }) => {
  const [tests, setTests] = useState([]); // State to hold fetched tests
  const [selectedTest, setSelectedTest] = useState(null); // State to keep track of selected test
  const [questionPaper, setQuestionPaper] = useState([]); // State to hold fetched question paper
  const [questionIDs, setQuestionIDs] = useState([]); // State to hold selected question IDs
  const [selectedOptions, setSelectedOptions] = useState([]); // State to hold selected options
  const [rollNo, setRollNo] = useState(""); // State to hold roll number
  const [testID, setTestID] = useState(""); // State to hold current selected test ID
  const [, forceUpdate] = useReducer((x) => x + 1, 0); // Reducer hook to force component update

  // Function to fetch data from the backend when the component mounts
  const fetchTests = async () => {
    try {
      const response = await fetch("https://eval-rose.vercel.app/loadTests"); // Fetch data from your backend API
      const data = await response.json();
      setTests(data); // Set the fetched tests in state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to fetch question paper for the selected test
  const fetchQuestionPaper = async (testID) => {
    try {
      const response = await fetch("https://eval-rose.vercel.app/loadQuestionPaper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ testID }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch question paper");
      }

      const questionPaperData = await response.json();
      // Ensure that questionPaperData is defined before mapping over it
      if (Array.isArray(questionPaperData)) {
        // Add a 'selectedOption' property to each question to track the selected radio button
        const updatedQuestionPaper = questionPaperData.map((question) => ({
          ...question,
          selectedOption: null,
        }));
        setQuestionPaper(updatedQuestionPaper);
      } else {
        console.error("Invalid question paper data format");
      }
    } catch (error) {
      console.error("Error fetching question paper:", error);
    }
  };

  // Function to handle selecting a test
  const handleTestClick = async (test) => {
    await fetchQuestionPaper(test._id);
    setSelectedTest(test); // Set the selected test to display fullscreen
    setTestID(test._id); // Set the current selected test ID
    setQuestionIDs(test.questionId); // Set the question IDs for the selected test
    setRollNo(userId); // Set the roll number using the received userId
  };

  // Function to handle going back to showing all tests
  const handleBackToTests = () => {
    setSelectedTest(null); // Reset selected test to null to display all tests
    setQuestionIDs([]); // Reset selected question IDs
    setSelectedOptions([]); // Reset selected options
    setRollNo(""); // Reset roll number
    setTestID(""); // Reset current selected test ID
  };

  // Function to handle radio button change
  const handleRadioChange = (questionIndex, optionIndex) => {
    // Update the selectedOption property in the questionPaper state
    setQuestionPaper((prevQuestionPaper) => {
      const newQuestionPaper = [...prevQuestionPaper];
      newQuestionPaper[questionIndex].selectedOption = optionIndex;
      return newQuestionPaper;
    });

    // Update the selectedOptions state
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[questionIndex] = `option${optionIndex + 1}`;
      return newSelectedOptions;
    });
  };

  // Function to handle score calculation
  const handleCalculateScore = async () => {
    try {
      const response = await fetch("https://eval-rose.vercel.app/calculateScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionIDs,
          options: selectedOptions,
          rollNo,
          testID,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate score");
      }

      const scoreData = await response.json();
      console.log("Score Data:", scoreData);
      // Add logic to handle the received score data (if needed)
    } catch (error) {
      console.error("Error calculating score:", error);
    }
  };

  // Function to create a new test
  const handleCreateNewTest = async () => {
    try {
      const response = await fetch("https://eval-rose.vercel.app/createNewTest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create new test");
      }

      // Add any additional logic or UI updates as needed after creating a new test
      console.log("New test created successfully");
      fetchTests();
      // forceUpdate(); // Force component update after creating a new test
    } catch (error) {
      console.error("Error creating new test:", error);
    }
  };

  useEffect(() => {
    fetchTests(); // Fetch data when the component mounts
  }, []);

  // useEffect to update rollNo when userId prop changes
  useEffect(() => {
    setRollNo(userId);
  }, [userId]);

  return (
    <div className="tests-container">
      {selectedTest ? (
        <div className="test-fullscreen">
          <div className="test-content">
            <button onClick={handleBackToTests}>⬅</button>
            <h1>Test {tests.indexOf(selectedTest) + 1}</h1>
            <div>
              {questionPaper.map((question, questionIndex) => (
                <div key={questionIndex} className="test-question">
                  <p>{question.problemStatement}</p>
                  <div className="test-options">
                    <div className="test-option">
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        id={`option-1-${questionIndex}`}
                        checked={question.selectedOption === 0}
                        onChange={() => handleRadioChange(questionIndex, 0)}
                      />
                      <label htmlFor={`option-1-${questionIndex}`}>
                        {question.option1}
                      </label>
                    </div>
                    <div className="test-option">
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        id={`option-2-${questionIndex}`}
                        checked={question.selectedOption === 1}
                        onChange={() => handleRadioChange(questionIndex, 1)}
                      />
                      <label htmlFor={`option-2-${questionIndex}`}>
                        {question.option2}
                      </label>
                    </div>
                    <div className="test-option">
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        id={`option-3-${questionIndex}`}
                        checked={question.selectedOption === 2}
                        onChange={() => handleRadioChange(questionIndex, 2)}
                      />
                      <label htmlFor={`option-3-${questionIndex}`}>
                        {question.option3}
                      </label>
                    </div>
                    <div className="test-option">
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        id={`option-4-${questionIndex}`}
                        checked={question.selectedOption === 3}
                        onChange={() => handleRadioChange(questionIndex, 3)}
                      />
                      <label htmlFor={`option-4-${questionIndex}`}>
                        {question.option4}
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleCalculateScore}>Calculate Score</button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Tests</h1>
          <div className="tests-wrapper">
            {tests.map((test, index) => (
              <div
                key={test._id}
                onClick={() => handleTestClick(test)}
                className="test-box"
              >
                <h3>Test {index + 1}</h3>
              </div>
            ))}
          </div>
          <button onClick={handleCreateNewTest}>Create New Test</button>
        </div>
      )}
    </div>
  );
};

export default Tests;
