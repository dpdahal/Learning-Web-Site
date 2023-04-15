import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import React from "react";

function AdminAsideComponents() {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);

    async function handleLogout(e) {

        let data = {
            id: user.id,
        }

        axios.post('http://localhost:8000/logout', data).then((response) => {
            console.log(response);
        });

    }

    return (
        <React.Fragment>

            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sideBackground sidebar collapse">
                <div className="position-sticky pt-3 sidebar-sticky">
                    <div className="profile">
                        <div className="profile-image mb-3">
                            <img src={user.image} className="rounded-circle p-2"
                                 width="100" height="100"
                                 alt="Admin"/>
                            {user.name}

                        </div>
                    </div>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to='/dashboard' className="nav-link activeColor" aria-current="page">
                                <span data-feather="home" className="align-text-bottom"/>
                                <i className="bi bi-grid-3x3-gap-fill"></i> Dashboard
                            </Link>
                        </li>

                        {user.role === 'admin' ?
                            <li className="nav-item">
                                <Link to='/show-users' className="nav-link" href="#">
                                    <span data-feather="file" className="align-text-bottom"/>
                                    <i className="bi bi-people-fill"></i> Users
                                </Link>
                            </li>
                            : ''}


                        {user.role === 'admin' ?
                            <li className="nav-item">
                                <Link to='/show-question' className="nav-link" href="#">
                                    <span data-feather="shopping-cart" className="align-text-bottom"/>
                                    <i className="bi bi-images"></i> Quiz Question
                                </Link>
                            </li>
                            : ''}
                        {user.role === 'admin' ?
                            <li className="nav-item">
                                <Link to='/show-imp-question' className="nav-link" href="#">
                                    <span data-feather="shopping-cart" className="align-text-bottom"/>
                                    <i className="bi bi-images"></i> Important Question
                                </Link>
                            </li>
                            :
                            <li className="nav-item">
                                <Link to='/show-important-question-for-user' className="nav-link" href="#">
                                    <span data-feather="shopping-cart" className="align-text-bottom"/>
                                    <i className="bi bi-images"></i> Important Question
                                </Link>
                            </li>
                        }
                        {user.role === 'admin' ?
                            <li className="nav-item">
                                <Link to='/show-video' className="nav-link" href="#">
                                    <span data-feather="shopping-cart" className="align-text-bottom"/>
                                    <i className="bi bi-images"></i> Learning Video
                                </Link>
                                <Link to='/show-video-for-user-order' className="nav-link" href="#">
                                    <span data-feather="shopping-cart" className="align-text-bottom"/>
                                    <i className="bi bi-book"></i> Learning Video Order
                                </Link>
                            </li>
                            :
                            <li className="nav-item">
                                <Link to='/show-video-for-user' className="nav-link" href="#">
                                    <span data-feather="shopping-cart" className="align-text-bottom"/>
                                    <i className="bi bi-book"></i> Learning Video
                                </Link>
                                <Link to='/show-video-for-user-order' className="nav-link" href="#">
                                    <span data-feather="shopping-cart" className="align-text-bottom"/>
                                    <i className="bi bi-book"></i> Learning Video Order
                                </Link>
                            </li>
                        }

                        {user.role === 'admin' ?
                            <li className="nav-item">
                                <Link to='/show-book' className="nav-link" href="#">
                                    <span data-feather="shopping-cart" className="align-text-bottom"/>
                                    <i className="bi bi-file-earmark-pdf"></i> Book & PDF
                                </Link>
                                <Link to='/show-book-for-user-order' className="nav-link" href="#">
                                    <span data-feather="shopping-cart" className="align-text-bottom"/>
                                    <i className="bi bi-file-earmark-pdf"></i> Book & PDF Order
                                </Link>
                            </li>
                            :
                            <li className="nav-item">
                                <Link to='/show-book-for-user' className="nav-link" href="#">
                                    <span data-feather="shopping-cart" className="align-text-bottom"/>
                                    <i className="bi bi-file-earmark-pdf"></i> Book & PDF
                                </Link>
                                <Link to='/show-book-for-user-order' className="nav-link" href="#">
                                    <span data-feather="shopping-cart" className="align-text-bottom"/>
                                    <i className="bi bi-file-earmark-pdf"></i> Book & PDF Order
                                </Link>
                            </li>

                        }

                        <li className="nav-item">
                            <Link to='/update-profile' className="nav-link" href="#">
                                <span data-feather="shopping-cart" className="align-text-bottom"/>
                                <i className="bi bi-pencil-square"></i> Update Profile
                            </Link>
                        </li>
                        {user.role === 'user' ?
                            <div>
                                <li className="nav-item">
                                    <Link to='/quiz-play' className="nav-link" href="#">
                                        <span data-feather="shopping-cart" className="align-text-bottom"/>
                                        <i className="bi bi-pencil-square"></i> Quiz Play
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/check-answer' className="nav-link" href="#">
                                        <span data-feather="shopping-cart" className="align-text-bottom"/>
                                        <i className="bi bi-pencil-square"></i> Check Answer
                                    </Link>
                                </li>
                            </div>
                            : ''}
                        <li className="nav-item">
                            <Link to='/change-password' className="nav-link">
                                <span data-feather="shopping-cart" className="align-text-bottom"/>
                                <i className="bi bi-lock-fill"></i> Change Password
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/add-suggest-question' className="nav-link">
                                <span data-feather="shopping-cart" className="align-text-bottom"/>
                                <i className="bi bi-book"></i> Suggest Question
                            </Link>
                        </li>

                    </ul>

                </div>
            </nav>
        </React.Fragment>
    );
}

export default AdminAsideComponents;