import React, { useState, useEffect } from 'react';
import './App.css';
import { QUESTIONS } from './questions';
import Question from './Question';
const getQuestions = (): string[] => {
  return Object.keys(QUESTIONS).map(key => QUESTIONS[parseInt(key)]);
};

function App() {
  const [answers, setAnswers] = useState<(string | null)[]>(Array(getQuestions().length).fill(null));
  const [averageScore, setAverageScore] = useState<number | null>(null);
  const [score, serScore] = useState<number | null>(null);

  useEffect(() => {
    calculateAverageScore();
  }, []);

  const handleAnswer = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    const yesCount = answers.filter(answer => answer === 'yes').length;
    return (yesCount / getQuestions().length) * 100;
  };

  const calculateAverageScore = () => {
    const scores = JSON.parse(localStorage.getItem('scores') || '[]');
    if (scores.length > 0) {
      const total = scores.reduce((acc: number, score: number) => acc + score, 0);
      const average = total / scores.length;
      setAverageScore(average);
    }
  };

  const handleSubmit = () => {
    
    serScore(calculateScore());
    const scores = JSON.parse(localStorage.getItem('scores') || '[]');
    scores.push(score);
    localStorage.setItem('scores', JSON.stringify(scores));

    calculateAverageScore();
  };

  return (
    <div className="App">
      <h1>Yes/No Questionnaire</h1>
      <form>
        {getQuestions().map((question, index) => (
          <Question
            key={index}
            index={index}
            question={question}
            handleAnswer={handleAnswer}
          />
        ))}
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
      {score && `Your score is: ${score}%`}
      {averageScore !== null && (
        <div className="average-score">
          <p>Average score for all runs: {averageScore.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
