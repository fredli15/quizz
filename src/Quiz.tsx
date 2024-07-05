import React, { useState } from 'react';
import './App.css';

interface AnswerOption {
  answerText: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  answerOptions: AnswerOption[];
}

interface Category {
  name: string;
  image: string;
  questions: Question[];
}

const categories: Category[] = [
  {
    name: "Binatang",
    image: "https://img.freepik.com/free-vector/wild-animal-group-white-background_1308-112351.jpg",
    questions: [
      {
        questionText: 'Apa nama hewan yang besar, abu-abu, dan memiliki belalai?',
        answerOptions: [
          { answerText: 'Gajah', isCorrect: true },
          { answerText: 'Kucing', isCorrect: false },
          { answerText: 'Anjing', isCorrect: false },
          { answerText: 'Sapi', isCorrect: false },
        ],
      },
      {
        questionText: 'Hewan apa yang mengeluarkan suara "meong"?',
        answerOptions: [
          { answerText: 'Kucing', isCorrect: true },
          { answerText: 'Kelinci', isCorrect: false },
          { answerText: 'Kuda', isCorrect: false },
          { answerText: 'Ayam', isCorrect: false },
        ],
      },
      // Tambahkan lebih banyak pertanyaan di sini jika diperlukan
    ],
  },
  {
    name: "Buah-buahan",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsO62q621Tt6rsmEsl4OFY8wt-isiXfpYdcXB0NtYV2iBgU84qpI-_0xJz0tw2ujPOalA&usqp=CAU",
    questions: [
      {
        questionText: 'Buah apa yang berwarna kuning dan memiliki kulit yang bisa dikupas?',
        answerOptions: [
          { answerText: 'Pisang', isCorrect: true },
          { answerText: 'Jeruk', isCorrect: false },
          { answerText: 'Anggur', isCorrect: false },
          { answerText: 'Apel', isCorrect: false },
        ],
      },
      {
        questionText: 'Buah apa yang memiliki duri di luar dan rasa manis di dalam?',
        answerOptions: [
          { answerText: 'Durian', isCorrect: true },
          { answerText: 'Mangga', isCorrect: false },
          { answerText: 'Pepaya', isCorrect: false },
          { answerText: 'Semangka', isCorrect: false },
        ],
      },
      // Tambahkan lebih banyak pertanyaan di sini jika diperlukan
    ],
  },
  {
    name: "Angka",
    image: "https://anakkita.co.id/wp-content/uploads/2013/04/pintarnenulis.jpg",
    questions: [
      {
        questionText: 'Berapa jumlah kaki seekor kucing?',
        answerOptions: [
          { answerText: '4', isCorrect: true },
          { answerText: '2', isCorrect: false },
          { answerText: '3', isCorrect: false },
          { answerText: '5', isCorrect: false },
        ],
      },
      {
        questionText: 'Berapa jumlah jari di tanganmu?',
        answerOptions: [
          { answerText: '5', isCorrect: true },
          { answerText: '6', isCorrect: false },
          { answerText: '7', isCorrect: false },
          { answerText: '4', isCorrect: false },
        ],
      },
      // Tambahkan lebih banyak pertanyaan di sini jika diperlukan
    ],
  },
  {
    name: "Alat Musik",
    image: "https://asset-a.grid.id//crop/0x0:0x0/700x465/photo/2021/09/23/fotojet-25-minjpg-20210923084535.jpg",
    questions: [
      {
        questionText: 'Alat musik apa yang dipukul untuk menghasilkan suara?',
        answerOptions: [
          { answerText: 'Drum', isCorrect: true },
          { answerText: 'Gitar', isCorrect: false },
          { answerText: 'Biola', isCorrect: false },
          { answerText: 'Piano', isCorrect: false },
        ],
      },
      {
        questionText: 'Alat musik apa yang memiliki tuts dan dimainkan dengan jari?',
        answerOptions: [
          { answerText: 'Piano', isCorrect: true },
          { answerText: 'Suling', isCorrect: false },
          { answerText: 'Saxophone', isCorrect: false },
          { answerText: 'Gong', isCorrect: false },
        ],
      },
      // Tambahkan lebih banyak pertanyaan di sini jika diperlukan
    ],
  },
  // Tambahkan kategori lain di sini
];


const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [gameState, setGameState] = useState<'welcome' | 'category' | 'quiz'>('welcome');
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackClass, setFeedbackClass] = useState<string>(''); // State untuk kelas feedback
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const startCategorySelection = () => {
    setGameState('category');
  };

  const startQuiz = (category: Category) => {
    setSelectedCategory(category);
    setGameState('quiz');
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setFeedback('');
    setFeedbackClass(''); // Reset kelas feedback
  };

  const handleAnswerOptionClick = (isCorrect: boolean, index: number): void => {
    const buttonElements = document.getElementsByClassName('answer-button');

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setFeedback('Benar!');
      buttonElements[index].classList.add('correct');
      setFeedbackClass('correct-text'); // Tambahkan kelas untuk teks benar
    } else {
      setFeedback('Salah!');
      buttonElements[index].classList.add('incorrect');
      setFeedbackClass('incorrect-text'); // Tambahkan kelas untuk teks salah
    }

    setTimeout(() => {
      setFeedback('');
      setFeedbackClass(''); // Hapus kelas setelah feedback selesai
      buttonElements[index].classList.remove('correct', 'incorrect');
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < selectedCategory!.questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const backToCategorySelection = () => {
    setGameState('category');
    setSelectedCategory(null);
    setShowScore(false);
  };

  if (gameState === 'welcome') {
    return (
      <div className='quiz welcome-screen'>
        <h2>Selamat Datang di Quiz App</h2>
        <p>Uji pengetahuan Adik-adik yuk!</p>
        <button onClick={startCategorySelection} className='start-button'>Mulai Quiz</button>
      </div>
    );
  }

  if (gameState === 'category') {
    return (
      <div className='quiz category-screen'>
        <h2>Pilih Kategori Quiz</h2>
        <div className='category-container'>
          {categories.map((category, index) => (
            <div key={index} className='category-card' onClick={() => startQuiz(category)}>
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='quiz'>
      {showScore ? (
        <div className='score-section'>
          <h2>Quiz Selesai!</h2>
          <p>Anda menjawab {score} dari {selectedCategory!.questions.length} pertanyaan dengan benar!</p>
          <button onClick={() => startQuiz(selectedCategory!)} className='restart-button'>Ulangi Quiz</button>
          <button onClick={backToCategorySelection} className='back-button'>Kembali ke Kategori</button>
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Pertanyaan {currentQuestion + 1}</span>/{selectedCategory!.questions.length}
            </div>
            <div className='question-text'>{selectedCategory!.questions[currentQuestion].questionText}</div>
          </div>
          <div className='answer-section'>
            {selectedCategory!.questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <button 
                key={index} 
                className='answer-button' 
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect, index)}>
                {answerOption.answerText}
              </button>
            ))}
          </div>
          {feedback && <div className={`feedback ${feedbackClass}`}>{feedback}</div>} {/* Tambahkan kelas dinamis */}
          <div className='score-tracker'>Skor: {score}</div>

        
        </>
      )}
    </div>
  );
}

export default Quiz;
