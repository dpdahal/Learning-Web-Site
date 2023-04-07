import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import Swal from "sweetalert2";
import {getUsers, deleteUser} from "../../../../lib/reducers/usersSlice";

function ShowUserComponents() {
    let dispatch = useDispatch();
    const usersData = useSelector((store) => store);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);


    return (
        <React.Fragment>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className="row mt-3 mb-5">
                    <div className="col-md-12">
                        <h1><i className="bi bi-people-fill"></i> Register Client</h1>
                        <hr/>
                    </div>
                    <div className="col-md-12 mt-2">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Images</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {usersData && usersData.user.data.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{++index}</td>
                                        <td>{user.name}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.email}</td>
                                        <th>{user.phone}</th>
                                        <td>

                                            {(() => {
                                                if (user.role === 'admin') {
                                                    return (
                                                        <div>
                                                            <button
                                                                className="btn btn-danger">{user.role}
                                                            </button>
                                                        </div>
                                                    )
                                                } else if (user.role === 'client') {
                                                    return (
                                                        <div>
                                                            <button
                                                                className="btn btn-warning">{user.role}
                                                            </button>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div>
                                                            <button
                                                                className="btn btn-primary">{user.role}
                                                            </button>
                                                        </div>
                                                    )
                                                }


                                            })()}

                                        </td>
                                        <td>
                                            <img src={user.image} width="40" alt=""/>
                                        </td>
                                        <td>

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

export default ShowUserComponents