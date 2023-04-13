import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import React, {useEffect, useState} from "react";
import api from "../../../../lib/api";
import "./Quiz.css"


function QuizQuestionAnswer() {
    const [questions, setQuestions] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    let user = localStorage.getItem('user');
    user = JSON.parse(user);

    const getAllQuestion = () => {
        api.get('http://localhost:8000/question').then((response) => {
            setQuestions(response.data.question);
        });
    }

    useEffect(() => {
        getAllQuestion();
    }, []);

    const optionClicked = (questionId, option) => {
        if (option) {
            let sendData = {
                questionId: questionId,
                answer: option.option
            }
            api.post('http://localhost:8000/question/check-playing', sendData).then((response) => {
                if (response.data.isCorrect === true) {
                    sendData.userId = user._id;
                    setScore(score + 1);
                    api.post('http://localhost:8000/question/insert-answer', sendData).then((response) => {
                        console.log(response);
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    api.post('http://localhost:8000/question/insert-answer', sendData).then((response) => {
                        console.log(response);
                    }).catch((err) => {
                        console.log(err);
                    })
                    sendData.userId = user._id;
                }
            }).catch((err) => {
                console.log(err);
            });

        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    /* Resets the game back to default */
    const restartGame = () => {
        setScore(0);
        setCurrentQuestion(0);
        setShowResults(false);
    };

    if (questions.length === 0) {
        return (
            <React.Fragment>
                <AdminHeaderComponents/>
                <AdminAsideComponents/>
                <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <h1 className="card-title-dp">
                                <i className="bi bi-bag-plus-fill"></i> Sajilo Pathasala

                            </h1>
                            <hr/>
                        </div>
                        <div className="col-md-12 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">No Question Found</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        )
    }
    return (<React.Fragment>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                <div className="row">
                    <div className="quiz-style">
                        <h1>Sajilo Pathasala</h1>
                        <h2>Score: {score}</h2>
                        {showResults ? (
                            <div className="final-results">
                                <h1>Final Results</h1>
                                <h2>
                                    {score} out of {questions.length} correct - (
                                    {(score / questions.length) * 100}%)
                                </h2>
                                <button onClick={() => restartGame()}>Restart game</button>
                            </div>
                        ) : (
                            /* 5. Question Card  */
                            <div className="question-card">
                                {/* Current Question  */}
                                <h2>
                                    Question: {currentQuestion + 1} out of {questions.length}
                                </h2>
                                <h3 className="question-text">{questions[currentQuestion].prompt}</h3>

                                <ul>
                                    {/* 6. Map through the options and display them */}
                                    {questions[currentQuestion].options.map((option, index) => (
                                        <li
                                            key={index}
                                            className="option"
                                            onClick={() => optionClicked(questions[currentQuestion]._id, option)}
                                        >
                                            {option.option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </React.Fragment>


    )
}

export default QuizQuestionAnswer