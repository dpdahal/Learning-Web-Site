import React, {useState} from "react";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import api from "../../../../lib/api";

const AddQuestion = () => {
    const [type, setType] = useState("");
    const [typeError, setTypeError] = useState("");
    const [question, setQuestion] = useState("");
    const [questionError, setQuestionError] = useState("");
    const [image, setImage] = useState("");

    const typeInput = (event) => {
        setType(event.target.value);
        setTypeError("");
    }
    const questionInput = (event) => {
        setQuestion(event.target.value);
        setQuestionError("");
    }
    const imageInput = (event) => {
        setImage(event.target.files[0]);

    }
    /*
    ======================Option One=====================
     */
    const [optionOne, setOptionOne] = useState("");
    const [optionOneFile, setOptionOneFile] = useState(null);
    const [optionOneError, setOptionOneError] = useState("");
    const handleOptionOne = (event) => {
        setOptionOne(event.target.value);
        setOptionOneFile(null);
        setOptionOneError("");
    };
    const handleOptionOneImage = (event) => {
        setOptionOneFile(event.target.files[0]);
        setOptionOne("");
        setOptionOneError("");
    };

    /*
    ======================End Option One=====================
     */

    /*
    ======================Option Two=====================
     */

    const [optionTwo, setOptionTwo] = useState("");
    const [optionTwoFile, setOptionTwoFile] = useState(null);
    const [optionTwoError, setOptionTwoError] = useState("");
    const handleOptionTwo = (event) => {
        setOptionTwo(event.target.value);
        setOptionTwoFile(null);
        setOptionTwoError("");
    };
    const handleOptionTwoImage = (event) => {
        setOptionTwoFile(event.target.files[0]);
        setOptionTwo("");
        setOptionTwoError("");
    };


    /*
      ======================End Option Two=====================
       */

    /*
    ======================Option Three=====================
     */

    const [optionThree, setOptionThree] = useState("");
    const [optionThreeFile, setOptionThreeFile] = useState(null);
    const [optionThreeError, setOptionThreeError] = useState("");
    const handleOptionThree = (event) => {
        setOptionThree(event.target.value);
        setOptionThreeFile(null);
        setOptionThreeError("");
    };
    const handleOptionThreeImage = (event) => {
        setOptionThreeFile(event.target.files[0]);
        setOptionThree("");
        setOptionThreeError("");
    };

    /*
     ======================End Option Three=====================
      */

    /*
    ======================Option Four=====================
     */

    const [optionFour, setOptionFour] = useState("");
    const [optionFourFile, setOptionFourFile] = useState(null);
    const [optionFourError, setOptionFourError] = useState("");
    const handleOptionFour = (event) => {
        setOptionFour(event.target.value);
        setOptionFourFile(null);
        setOptionFourError("");
    }
    const handleOptionFourImage = (event) => {
        setOptionFourFile(event.target.files[0]);
        setOptionFour("");
        setOptionFourError("");
    }

    /*
        ======================End Option Four=====================
     */

    const [checked, setChecked] = useState([]);
    const handleToggle = (c) => () => {
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }

        setChecked(newCheckedCategoryId);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        if (type.trim() === "") {
            setTypeError("Please select type.");
        }
        if (question.trim() === "") {
            setQuestionError("Please fill in question.");
        }
        if (optionOne.trim() === "" && !optionOneFile) {
            setOptionOneError("Please fill in at least one field.");
        }
        if (optionTwo.trim() === "" && !optionTwoFile) {
            setOptionTwoError("Please fill in at least one field.");
        }
        if (optionThree.trim() === "" && !optionThreeFile) {
            setOptionThreeError("Please fill in at least one field.");
        }
        if (optionFour.trim() === "" && !optionFourFile) {
            setOptionFourError("Please fill in at least one field.");
        }

        let formData = new FormData();
        formData.append("type", type);
        formData.append("question", question);
        formData.append("optionOne", optionOne);
        formData.append('image', image ?? "");
        formData.append("optionAImage", optionOneFile ?? "");
        formData.append("optionTwo", optionTwo);
        formData.append("optionBImage", optionTwoFile ?? "");
        formData.append("optionThree", optionThree);
        formData.append("optionCImage", optionThreeFile ?? "");
        formData.append("optionFour", optionFour);
        formData.append("optionDImage", optionFourFile ?? "");
        formData.append("answer", checked);
        api.post("/question", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response);
            }).catch((error) => {
            console.log(error);
        })


    };


    return (
        <div>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                <div className="container question-add-page">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="text-center">Add Question</h1>
                        </div>
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
                                                {questionError && <span className="text-danger"> {questionError}</span>}
                                            </label>
                                            <input type="text" className="form-control form-control-sm"
                                                   onChange={questionInput}
                                                   id="question"
                                                   placeholder="Enter Question"/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="image">Prompt Image:</label>
                                            <input type="file" name="image"
                                                   onChange={imageInput}
                                                   className="form-control form-control-sm"/>
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
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group  mt-2">
                                            <label htmlFor="optionOneImage">Option 1 Image</label>
                                            <input type="file" onChange={handleOptionOneImage}
                                                   className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="form-group">
                                            <label htmlFor="optionOneCorrect">Is Correct</label>
                                            <br/>
                                            <input type="checkbox" onChange={handleToggle(1)}/>
                                        </div>

                                    </div>
                                    <div className="col-md-12">
                                        {optionOneError && <p className="text-danger text-center">{optionOneError}</p>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group  mt-2">
                                            <label htmlFor="option2">Option 2</label>
                                            <input type="text" value={optionTwo}
                                                   onChange={handleOptionTwo}
                                                   className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group  mt-2">
                                            <label htmlFor="optionOneImage">Option 2 Image</label>
                                            <input type="file" onChange={handleOptionTwoImage}
                                                   className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="form-group">
                                            <label htmlFor="optionTowCorrect">Is Correct</label>
                                            <br/>
                                            <input type="checkbox" onChange={handleToggle(2)}/>
                                        </div>

                                    </div>
                                    <div className="col-md-12">
                                        {optionTwoError && <p className="text-danger text-center">{optionTwoError}</p>}
                                    </div>
                                </div>
                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="form-group  mt-2">
                                            <label htmlFor="option3">Option 3</label>
                                            <input type="text" value={optionThree}
                                                   onChange={handleOptionThree}
                                                   className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group  mt-2">
                                            <label htmlFor="optionThreeImage">Option 3 Image</label>
                                            <input type="file" onChange={handleOptionThreeImage}
                                                   className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="form-group">
                                            <label htmlFor="optionThreeCorrect">Is Correct</label>
                                            <br/>
                                            <input type="checkbox" onChange={handleToggle(3)}/>
                                        </div>

                                    </div>
                                    <div className="col-md-12">
                                        {optionThreeError &&
                                            <p className="text-danger text-center">{optionThreeError}</p>}
                                    </div>
                                </div>
                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="form-group  mt-2">
                                            <label htmlFor="option4">Option 4</label>
                                            <input type="text" value={optionFour}
                                                   onChange={handleOptionFour}
                                                   className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group  mt-2">
                                            <label htmlFor="optionFourImage">Option 4 Image</label>
                                            <input type="file" onChange={handleOptionFourImage}
                                                   className="form-control form-control-sm"/>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="form-group">
                                            <label htmlFor="optionFourCorrect">Is Correct</label>
                                            <br/>
                                            <input type="checkbox" onChange={handleToggle(4)}/>
                                        </div>

                                    </div>
                                    <div className="col-md-12">
                                        {optionFourError &&
                                            <p className="text-danger text-center">{optionFourError}</p>}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 mt-3">
                                        <button className="btn btn-success">Add Quiz Question</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
};

export default AddQuestion;

