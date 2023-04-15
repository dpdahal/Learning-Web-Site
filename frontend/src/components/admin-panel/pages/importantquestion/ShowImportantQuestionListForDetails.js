import React, {useEffect, useState} from "react";
import api from "../../../../lib/api";
import {useParams} from "react-router-dom";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";

function ShowImportantQuestionListForDetails() {
    const [importantQuestionList, setImportantQuestionList] = useState([]);
    let params = useParams();

    let getImpQuestionList = async () => {
        let type = params.type;
        api.get(`/iq/show-important-question-for-user/${type}`).then((response) => {
            setImportantQuestionList(response.data.iq);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getImpQuestionList();
    }, []);

    if (importantQuestionList.length === 0) {
        return (
            <React.Fragment>
                <AdminHeaderComponents/>
                <AdminAsideComponents/>
                <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Important Question List</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="alert alert-danger" role="alert">
                                                    <h4 className="alert-heading">No Important Question Found</h4>
                                                    <p>There is no important question for you. Please try again
                                                        later.</p>
                                                    <hr/>
                                                    <p className="mb-0">If you have any question, please contact with
                                                        us.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <AdminHeaderComponents/>
                <AdminAsideComponents/>
                <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Important Question List</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <table className="table table-bordered">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">SL</th>
                                                        <th scope="col">Question</th>
                                                        <th scope="col">Description</th>
                                                        <th scope="col">Image</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        importantQuestionList.map((question, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td>{question.title}</td>
                                                                    <td>{question.description}</td>
                                                                    <td>
                                                                        <img src={question.image} width="100" alt="No Image"/>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }


    }


    export default ShowImportantQuestionListForDetails