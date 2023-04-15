import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import React, {useEffect, useState} from "react";
import api from "../../../../lib/api";
import {Link} from "react-router-dom";


function CheckQuizAnswer() {
    const [questions, setQuestions] = useState([]);
    const [yourAnswers, setYourAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    let user = localStorage.getItem('user');
    user = JSON.parse(user);

    const getQuestions = async () => {
        let sendData = {
            userId: user._id
        }
        const response = await api.post("/question/check-answer", sendData);
        setQuestions(response.data.questions);
        setYourAnswers(response.data.yourAnswer);
        setCorrectAnswers(response.data.correctAnswer);
    }


    useEffect(() => {
        getQuestions();

    }, []);

    const yourAnswerSeparateByComma = (answer) => {
        let yourAnswer = "";
        answer.forEach((ans) => {
            yourAnswer += ans + ", ";
        });
        return yourAnswer;
    }

    const correctAnswerSeparateByComma = (answer) => {
        let correctAnswer = "";
        answer.forEach((ans) => {
            correctAnswer += ans + ", ";
        });
        return correctAnswer;
    }

    let totalCorrectAnswer = 0;
    let totalWrongAnswer = 0;

    if (questions.length > 0) {
        for (let i = 0; i < questions.length; i++) {
            let correctAnswer = correctAnswers[i];
            let yourAnswer = yourAnswers[i];
            let isCorrect = true;
            for (let j = 0; j < correctAnswer.length; j++) {
                if (correctAnswer[j] !== yourAnswer[j]) {
                    isCorrect = false;
                }
            }

            if (isCorrect) {
                totalCorrectAnswer++;
            } else {
                totalWrongAnswer++;
            }
        }
    }

    let score = (totalCorrectAnswer / questions.length) * 100;
    score = score.toFixed(2);


    if (questions.length === 0) {
        return (
            <React.Fragment>
                <AdminHeaderComponents/>
                <AdminAsideComponents/>
                <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="text-center">You have not answered any question</h2>
                                    <hr/>
                                    <Link to="/add-suggest-question">Suggest Question</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <h2>Your Answers
                            <Link to="/add-suggest-question" className="btn btn-success float-end">Suggest Question</Link>
                        </h2>
                    </div>
                    <div className="col-md-12">

                        <table className="table table-hover">
                            <thead>
                            <tr className="bg-primary text-light">
                                <th>S.n</th>
                                <th>Question</th>
                                <th>Your Answer</th>
                                <th>Correct Answer</th>
                            </tr>
                            </thead>
                            <tbody>
                            {questions.map((question, index) => {
                                return (
                                    <tr key={index}>
                                        <td>#</td>
                                        <td>{question.question}</td>
                                        <td>
                                            {yourAnswerSeparateByComma(yourAnswers[index])}
                                        </td>
                                        <td>
                                            {correctAnswerSeparateByComma(correctAnswers[index])}
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr className="bg-info">
                                <td></td>
                                <td></td>
                                <td>Total Correct Answer: {totalCorrectAnswer}</td>
                                <td>Total Wrong Answer: {totalWrongAnswer}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )

}

export default CheckQuizAnswer