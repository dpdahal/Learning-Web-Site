import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";
import api from "../../../../lib/api";

function ShowQuestions() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);

    let getQuestion = () => {
        api.get("/question").then((res) => {
            console.log(res.data.question)
            setQuestions(res.data.question);
        });
    }

    useEffect(() => {
        getQuestion();
    }, []);


    const handleDelete = (id) => {
        Swal.fire({
            title: 'Do you want to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/question/${id}`).then((res) => {
                    if (res.data.success) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                        getQuestion();
                    }
                });
            }
        })
    };

    const updateData = (id) => {
        navigate(`/update-imp-question/${id}`);
    }

    if(questions.length === 0) return (<React.Fragment>
        <AdminHeaderComponents/>
        <AdminAsideComponents/>
        <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
            <div className="row">
                <div className="col-md-12 mb-4">
                    <h1 className="card-title-dp">
                        <i className="bi bi-bag-plus-fill"></i> Quiz Question List
                        <Link to={`/add-question`} className="btn btn-primary float-end">
                            <i className="bi bi-calendar-check-fill"></i> Add  Question
                        </Link>

                    </h1>
                    <hr/>
                </div>
                <div className="col-md-12">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Prompt</th>
                            <th>Option A</th>
                            <th>Option B</th>
                            <th>Option C</th>
                            <th>Option D</th>
                            <th>Images</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td colSpan="9" className="text-center">No data found</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </React.Fragment>);

    return (<React.Fragment>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <h1 className="card-title-dp">
                            <i className="bi bi-bag-plus-fill"></i> Quiz Question List
                            <Link to={`/add-question`} className="btn btn-primary float-end">
                                <i className="bi bi-calendar-check-fill"></i> Add  Question
                            </Link>

                        </h1>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Prompt</th>
                                <th>Option A</th>
                                <th>Option B</th>
                                <th>Option C</th>
                                <th>Option D</th>
                                <th>Images</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {questions && questions.map((impQuestion, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{++index}</td>
                                        <td>{impQuestion.type}</td>
                                        <td>{impQuestion.question}</td>
                                        <td>
                                            {impQuestion.optionsOne}
                                            <br/>
                                            <img src={impQuestion.optionAImage} width='50' alt="image not found"/>
                                        </td>
                                        <td>{impQuestion.optionsTwo}
                                            <br/>
                                            <img src={impQuestion.optionBImage} width='50' alt="image not found"/>
                                        </td>
                                        <td>{impQuestion.optionsThree}
                                            <br/>
                                            <img src={impQuestion.optionCImage} width='50' alt="image not found"/>
                                        </td>
                                        <td>{impQuestion.optionsFour}
                                            <br/>
                                            <img src={impQuestion.optionDImage} width='50' alt="image not found"/>
                                        </td>

                                        <td>
                                            <img src={impQuestion.image} width="90" alt=""/>
                                        </td>
                                        <td width="15%">
                                            <button onClick={() => updateData(impQuestion._id)}
                                                    className="btn btn-success">
                                                <i className="bi bi-pencil-square"></i> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(impQuestion._id)}
                                                className="btn btn-danger">
                                                <i className="bi bi-trash"></i> Delete
                                            </button>
                                        </td>
                                    </tr>);
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default ShowQuestions