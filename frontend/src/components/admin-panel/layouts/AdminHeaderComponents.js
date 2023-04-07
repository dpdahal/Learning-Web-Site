import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import React from "react";

function AdminHeaderComponents() {
    const authData = useSelector((store) => store);
    let authUser = authData.auth.data;

    let logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }
    return (
        <React.Fragment>
            <header className="navbar  sticky-top adminHeaderColor">
                <div className="container-fluid">
                    <Link to="/" className="col-md-3 col-lg-2 me-0 px-3 activeColor">
                    </Link>
                    <div className="navbar-nav">
                        <div className="nav-item text-nowrap">
                            <button className="logoutBtn px-3"
                                    onClick={logout}>
                                Sign out Account
                                <i className="bi bi-file-earmark-lock2"></i>

                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}

export default AdminHeaderComponents;