import React from 'react';
import Quiz from './Quiz';
import './App.css';

const App: React.FC = () => {
  // Tahun untuk hak cipta
  const year = 2023; // Ganti dengan tahun yang Anda inginkan
  const copyright =
    "\u00A9 " + year + " Fredli Fourqoni. all rights reserved";

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <div className='bubble'></div>
      <div className='bubble'></div>
      <div className='bubble'></div>
      <div className='bubble'></div>
      <div className='bubble'></div>
      <Quiz />
      {/* Informasi hak cipta */}
      <footer className='app-footer'>
        <p>{copyright}</p>
      </footer>
    </div>
  );
}

export default App;
