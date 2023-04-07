import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";
import api from "../../../../lib/api";

function ShowImportantQuestionComponents() {
    const navigate = useNavigate();
    const [ImpQuestion, setImpQuestion] = useState([]);

    let getImpQuestion = () => {
        api.get("/iq").then((res) => {
            setImpQuestion(res.data.iq);
        });
    }

    useEffect(() => {
        getImpQuestion();
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
                api.delete(`/iq/${id}`).then((res) => {
                    if (res.data.success) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                        getImpQuestion();
                    }
                });
            }
        })
    };

    const updateData = (id) => {
        navigate(`/update-imp-question/${id}`);
    }

    return (<React.Fragment>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <h1 className="card-title-dp">
                            <i className="bi bi-bag-plus-fill"></i> Important Question List
                            <Link to={`/add-imp-question`} className="btn btn-primary float-end">
                                <i className="bi bi-calendar-check-fill"></i> Add Important Question
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
                                <th>Title</th>
                                <th>Description</th>
                                <th>Images</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {ImpQuestion && ImpQuestion.map((impQuestion, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{++index}</td>
                                        <td>{impQuestion.type}</td>
                                        <td>{impQuestion.title}</td>
                                        <td>{impQuestion.description}</td>
                                        <td>
                                            <img src={impQuestion.image} width="90" alt=""/>
                                        </td>
                                        <td>
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

export default ShowImportantQuestionComponents