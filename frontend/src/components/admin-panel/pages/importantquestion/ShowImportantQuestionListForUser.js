import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import React from "react";
import {Link} from "react-router-dom";

function ShowImportantQuestionListForUser() {
    return (<React.Fragment>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <h1 className="card-title-dp">
                            <i className="bi bi-book"></i>Important Questions Type
                        </h1>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h1><Link to={`/show-important-question-user-type/MBBS`}>MBBS</Link></h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h1><Link to={`/show-important-question-user-type/Engineering`}>Engineering</Link></h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h1><Link to={`/show-important-question-user-type/LokSewa`}>LokSewa</Link></h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default ShowImportantQuestionListForUser