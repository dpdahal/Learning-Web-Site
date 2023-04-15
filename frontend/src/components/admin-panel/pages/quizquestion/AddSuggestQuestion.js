import React, {useEffect, useState} from "react";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import api from "../../../../lib/api";

const AddSuggestQuestion = () => {
    const [getAllQuestion, setGetAllQuestion] = useState([]);
    const [type, setType] = useState("");
    const [typeError, setTypeError] = useState("");
    const [question, setQuestion] = useState("");
    const [questionError, setQuestionError] = useState("");
    const [answer, setAnswer] = useState("");
    const [answerError, setAnswerError] = useState("");

    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    let token = localStorage.getItem("token");
    api.defaults.headers.common["Authorization"] = `${token}`;

    let getAllQuestionData = () => {
        api.get("/question/suggest/question")
            .then((response) => {
                console.log(response);
                setGetAllQuestion(response.data.sData);
            }).catch((error) => {
            console.log(error);
        })
    }


    useEffect(() => {
        getAllQuestionData();
    }, []);

    const typeInput = (event) => {
        setType(event.target.value);
        setTypeError("");
    }
    const questionInput = (event) => {
        setQuestion(event.target.value);
        setQuestionError("");
    }

    /*
    ======================Option One=====================
     */
    const [optionOne, setOptionOne] = useState("");
    const [optionOneError, setOptionOneError] = useState("");
    const handleOptionOne = (event) => {
        setOptionOne(event.target.value);
        setOptionOneError("");
    };


    /*
    ======================End Option One=====================
     */

    /*
    ======================Option Two=====================
     */

    const [optionTwo, setOptionTwo] = useState("");
    const [optionTwoError, setOptionTwoError] = useState("");
    const handleOptionTwo = (event) => {
        setOptionTwo(event.target.value);
        setOptionTwoError("");
    };


    /*
      ======================End Option Two=====================
       */

    /*
    ======================Option Three=====================
     */

    const [optionThree, setOptionThree] = useState("");
    const [optionThreeError, setOptionThreeError] = useState("");
    const handleOptionThree = (event) => {
        setOptionThree(event.target.value);
        setOptionThreeError("");
    };

    /*
     ======================End Option Three=====================
      */

    /*
    ======================Option Four=====================
     */

    const [optionFour, setOptionFour] = useState("");
    const [optionFourError, setOptionFourError] = useState("");
    const handleOptionFour = (event) => {
        setOptionFour(event.target.value);
        setOptionFourError("");
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        if (type.trim() === "") {
            setTypeError("Please select type.");
        }
        if (question.trim() === "") {
            setQuestionError("Please fill in question.");
        }
        if (optionOne.trim() === "") {
            setOptionOneError("Please select option one.");
        }
        if (optionTwo.trim() === "") {
            setOptionTwoError("Please select option two.");
        }
        if (optionThree.trim() === "") {
            setOptionThreeError("Please select option three.");
        }
        if (optionFour.trim() === "") {
            setOptionFourError("Please select option four");
        }
        if (answer.trim() === "") {
            setAnswerError("Please select answer");
        }

        let sendData = {
            userId: user._id,
            type: type,
            question: question,
            optionOne: optionOne,
            optionTwo: optionTwo,
            optionThree: optionThree,
            optionFour: optionFour,
            answer: answer
        }
        api.post("/question/suggest/add", sendData)
            .then((response) => {
                console.log(response);
                window.location.href = "/add-suggest-question";
            }).catch((error) => {
            console.log(error);
        })


    };

    const deleteQuestion = (id) => {
        api.delete(`/question/suggest/delete/${id}`)
            .then((response) => {
                console.log(response);
                window.location.href = "/add-suggest-question";
            }).catch((error) => {
            console.log(error);
        })
    }


    return (
        <div>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                <div className="container question-add-page">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Mange Suggest Question</h1>
                            <hr/>
                        </div>
                        {user.role === 'admin' ?
                            <div></div>
                            : <div>
                                <h3>Add Suggest Question</h3>
                                <hr/>
                                <div className="col-md-12">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group mb-2">
                                                    <label htmlFor="title">Type:
                                                        {typeError && <span className="text-danger"> {typeError}</span>}
                                                    </label>
                                                    <select name="type" onChange={typeInput}
                                                            className="form-control form-control-sm">
                                                        <option value="">Select Type</option>
                                                        <option value="MBBS">MBBS</option>
                                                        <option value="Engineering">Engineering</option>
                                                        <option value="LokSewa">LokSewa</option>
                                                    </select>
                                                </div>
                                                <div className="form-group mb-2">
                                                    <label htmlFor="question">Question:
                                                        {questionError &&
                                                            <span className="text-danger"> {questionError}</span>}
                                                    </label>
                                                    <input type="text" className="form-control form-control-sm"
                                                           onChange={questionInput}
                                                           id="question"
                                                           placeholder="Enter Question"/>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group  mt-2">
                                                    <label htmlFor="option1">Option 1</label>
                                                    <input type="text" value={optionOne}
                                                           onChange={handleOptionOne}
                                                           className="form-control form-control-sm"/>
                                                </div>
                                                {optionOneError && <p className="text-danger">{optionOneError}</p>}

                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group  mt-2">
                                                    <label htmlFor="option2">Option 2</label>
                                                    <input type="text" value={optionTwo}
                                                           onChange={handleOptionTwo}
                                                           className="form-control"/>
                                                </div>
                                                {optionTwoError && <p className="text-danger">{optionTwoError}</p>}
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group  mt-2">
                                                    <label htmlFor="option3">Option 3</label>
                                                    <input type="text" value={optionThree}
                                                           onChange={handleOptionThree}
                                                           className="form-control form-control-sm"/>
                                                </div>
                                                {optionThreeError &&
                                                    <p className="text-danger">{optionThreeError}</p>}

                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group  mt-2">
                                                    <label htmlFor="option4">Option 4</label>
                                                    <input type="text" value={optionFour}
                                                           onChange={handleOptionFour}
                                                           className="form-control form-control-sm"/>
                                                </div>
                                                {optionFourError &&
                                                    <p className="text-danger">{optionFourError}</p>}

                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group  mt-2">
                                                    <label htmlFor="answer">Answer:
                                                        {answer}
                                                        {answerError &&
                                                            <span className="text-danger">{answerError}</span>}
                                                    </label>
                                                    <select name="answer" className="form-control form-control-sm"
                                                            onChange={(e) => setAnswer(e.target.value)}>
                                                        <option value="optionOne">Option One</option>
                                                        <option value="optionTwo">Option Two</option>
                                                        <option value="optionThree">Option Three</option>
                                                        <option value="optionFour">Option Four</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12 mt-3">
                                                <button className="btn btn-success">Add suggest Question</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }


                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>S.n</th>
                                    <th>Book Title</th>
                                    {user.role === 'admin' && <th>Client</th>}
                                    <th>Option1</th>
                                    <th>Option2</th>
                                    <th>Option3</th>
                                    <th>Option4</th>
                                    <th>Answer</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {getAllQuestion.map((book, index) => (
                                    <tr key={index}>
                                        <td>{++index}</td>
                                        <td>{book.question}</td>
                                        {user.role === 'admin' && <td>{book.userId.name}</td>}
                                        <td>{book.optionOne}</td>
                                        <td>{book.optionTwo}</td>
                                        <td>{book.optionThree}</td>
                                        <td>{book.optionFour}</td>
                                        <td>{book.answer}</td>

                                        <td>

                                            {
                                                (() => {
                                                    if (user.role === 'admin') {
                                                        return (
                                                            <React.Fragment>
                                                                {
                                                                    <div>
                                                                        <button
                                                                            onClick={(e) => deleteQuestion(book._id)}
                                                                            className="btn  btn-danger">Delete
                                                                        </button>

                                                                    </div>

                                                                }


                                                            </React.Fragment>
                                                        )
                                                    } else
                                                        return <React.Fragment>

                                                        </React.Fragment>
                                                })()
                                            }


                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>

            </main>
        </div>
    );
};

export default AddSuggestQuestion;

