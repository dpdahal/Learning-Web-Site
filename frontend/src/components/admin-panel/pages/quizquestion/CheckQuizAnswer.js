import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import React, {useEffect, useState} from "react";
import api from "../../../../lib/api";


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
        setYourAnswers(response.data.yourAnswers);
        setCorrectAnswers(response.data.correctAnswers);
    }


    useEffect(() => {
        getQuestions();

    }, []);

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
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="text-center">Your Answers</h2>
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Your Answer</th>
                                        <th>Correct Answer</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {questions.map((question, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{question.prompt}</td>
                                                <td>{yourAnswers[index]}
                                                    {yourAnswers[index] === correctAnswers[index] ?
                                                        <button className="btn btn-success btn-sm"><i
                                                            className="bi bi-check"></i></button>
                                                        :
                                                        <button className="btn btn-danger btn-sm">
                                                            <i className="bi bi-x-circle-fill"></i>
                                                        </button>
                                                    }

                                                </td>
                                                <td>
                                                    {correctAnswers[index]}
                                                    <button className="btn btn-success btn-sm"><i
                                                        className="bi bi-check"></i></button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )

}

export default CheckQuizAnswer