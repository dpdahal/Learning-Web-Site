import {useEffect, useState} from "react";
import api from "../../../../lib/api";

function Demo() {
    const [checkedItems, setCheckedItems] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(3000);
    const [questionsList, setQuestionsList] = useState([]);

    let getQuestions = () => {
        api.get('/question').then((response) => {
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
            answer: selectedOptions
        }
        console.log(sendAnswer);
        setCheckedItems({});
    }

    let handlePrevious = () => {
        setCurrentIndex(currentIndex - 1);
        // setTimeLeft(15); // Reset countdown timer for the previous question
        setCheckedItems({});
    }

    if (questionsList.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div className="container">
            <h2>Checkbox Form</h2>
            <p>Time left: {timeLeft} seconds</p>
            <p>Score: {score}</p>
            {questionsList.map((options, index) => (
                index === currentIndex && (
                    <div key={index} className="col-md-12">
                        <h3>{options.question}</h3>
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
                                        <img src={options.optionAImage} width="100%" height="200" alt=""/>
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
                                        <img src={options.optionBImage} width="100%" height="200" alt=""/>
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
                                        <img src={options.optionCImage} width="100%" height="200" alt=""/>
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
                                        <img src={options.optionDImage} width="100%" height="200" alt=""/>
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
    );

}

export default Demo;