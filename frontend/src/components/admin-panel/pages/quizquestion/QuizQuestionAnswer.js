import React, {useEffect, useState} from "react";
import api from "../../../../lib/api";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import {useParams} from "react-router-dom";

function QuizQuestionAnswer() {
    const [checkedItems, setCheckedItems] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(3000);
    const [questionsList, setQuestionsList] = useState([]);
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    const params = useParams();
    let type = params.id;

    let getQuestions = () => {
        api.get(`/question/play/quiz-play-type/${type}`).then((response) => {
            console.log(response.data.question)
            setQuestionsList(response.data.question);
        });
    }

    useEffect(() => {
        getQuestions();
    }, []);


    const handleCheckboxChange = (event) => {
        const {id, checked} = event.target;
        setCheckedItems({...checkedItems, [id]: checked});
    }

    const isArraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        for (let i = arr1.length; i--;) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    const handleNext = () => {
        const answer = questionsList[currentIndex].answer;
        answer.map((item) => {
            return parseInt(item);
        })
        const selectedOptions = Object.entries(checkedItems)
            .filter(([id, checked]) => checked)
            .map(([id, checked]) => id);
        let correct = isArraysEqual(selectedOptions, answer);
        if (correct) {
            setScore(score + 1);
        }
        setCurrentIndex(currentIndex + 1);
        let questionId = questionsList[currentIndex]._id;
        let sendAnswer = {
            questionId: questionId,
            userId: user._id,
            answer: selectedOptions
        }
        api.post('/question/insert-answer', sendAnswer).then((response) => {
            console.log(response);
        });
        setCheckedItems({});
    }

    let handlePrevious = () => {
        setCurrentIndex(currentIndex - 1);
        // setTimeLeft(15); // Reset countdown timer for the previous question
        setCheckedItems({});
    }

    if (questionsList.length === 0) {
        return (

            <React.Fragment>
                <AdminHeaderComponents/>
                <AdminAsideComponents/>
                <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                    <h1>No Questions Found</h1>
                </main>

            </React.Fragment>

        )
    }

    return (
        <React.Fragment>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Play Quiz</h2>
                            <hr/>
                            <p>Time left: {timeLeft} seconds</p>
                            <p>Score: {score}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {questionsList.map((options, index) => (
                                index === currentIndex && (
                                    <div key={index} className="col-md-12">
                                        <h3>{options.question}</h3>
                                        {options.image ?
                                            <div>
                                                <img src={options.image} width="100%" height="300" alt=""/>
                                            </div>
                                            :
                                            <div></div>
                                        }
                                        <div className="row mt-4">
                                            <div className="col-md-6">
                                                {options.optionOne ?
                                                    <div>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                value="1"
                                                                id="1"
                                                                checked={checkedItems[1] || false}
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            {options.optionOne}
                                                        </label>

                                                    </div>
                                                    :
                                                    <div>
                                                        <img src={options.optionAImage} width="100%" height="200"
                                                             alt=""/>
                                                        <label>
                                                            <input
                                                                type="checkbox" value="1" id="1"
                                                                checked={checkedItems[1] || false}
                                                                onChange={handleCheckboxChange}/>
                                                        </label>

                                                    </div>
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                {options.optionTwo ?
                                                    <div>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                value="2"
                                                                id="2"
                                                                checked={checkedItems[2] || false}
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            {options.optionTwo}
                                                        </label>
                                                    </div>
                                                    :
                                                    <div>
                                                        <img src={options.optionBImage} width="100%" height="200"
                                                             alt=""/>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                value="2" id="2" checked={checkedItems[2] || false}
                                                                onChange={handleCheckboxChange}/>
                                                        </label>
                                                    </div>
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                {options.optionThree ?
                                                    <div>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                value="3" id="3"
                                                                checked={checkedItems[3] || false}
                                                                onChange={handleCheckboxChange}/>
                                                            {options.optionThree}
                                                        </label>
                                                    </div>
                                                    :
                                                    <div>
                                                        <img src={options.optionCImage} width="100%" height="200"
                                                             alt=""/>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                value="3"
                                                                id="3"
                                                                checked={checkedItems[3] || false}
                                                                onChange={handleCheckboxChange}/>
                                                        </label>
                                                    </div>
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                {options.optionFour ?
                                                    <div>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                value="4"
                                                                id="4"
                                                                checked={checkedItems[4] || false}
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            {options.optionFour}
                                                        </label>
                                                    </div>
                                                    :
                                                    <div>
                                                        <img src={options.optionDImage} width="100%" height="200"
                                                             alt=""/>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                value="4"
                                                                id="4"
                                                                checked={checkedItems[4] || false}
                                                                onChange={handleCheckboxChange}/>
                                                        </label>
                                                    </div>
                                                }
                                            </div>

                                        </div>
                                    </div>
                                )
                            ))}
                            <div className="container mt-4">

                                <button
                                    disabled={currentIndex === 0}
                                    onClick={handlePrevious}
                                >
                                    Previous
                                </button>
                                <button
                                    disabled={currentIndex === questionsList.length - 0}
                                    onClick={handleNext}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </React.Fragment>
    );

}

export default QuizQuestionAnswer;