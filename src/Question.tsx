import React from 'react';

interface QuestionProps {
  index: number;
  question: string;
  handleAnswer: (index: number, answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ index, question, handleAnswer }) => {
  return (
    <div className="question">
      <label>{`Question ${index + 1}: ${question}`}</label><br />
      <input 
        type="radio" 
        name={`q${index}`} 
        value="yes" 
        onChange={() => handleAnswer(index, 'yes')} 
      /> Yes
      <input 
        type="radio" 
        name={`q${index}`} 
        value="no" 
        onChange={() => handleAnswer(index, 'no')} 
      /> No
    </div>
  );
}

export default Question;
