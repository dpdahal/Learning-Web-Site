import React from "react";

import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import {changePassword} from "../../../../lib/reducers/usersSlice";

import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";


const RegisterSchema = yup.object().shape({
    old_password: yup.string().required(),
    password: yup.string().required(),
    confirm_password: yup.string().required()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),

});

function UpdateUserComponents() {
    const dispatch = useDispatch();

    const {
        register, reset, handleSubmit, formState: {errors}
    } = useForm({
        resolver: yupResolver(RegisterSchema)
    });
    let pStyle = {
        color: "#f60000",
    }


    const customPasswordChange = (data) => {
        let getUser = localStorage.getItem('user');
        let user = JSON.parse(getUser);
        data.id = user._id;
        dispatch(changePassword(data)).then((res) => {
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Password Changed',
                    text: res.payload.message,
                })
                reset();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.payload.error,
                })
            }
        });

    }


    return (
        <React.Fragment>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className="row mt-3 mb-5">
                    <div className="col-md-12">
                        <h1><i className="bi bi-pencil-square"></i> Change Password
                        </h1>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <form action="" onSubmit={handleSubmit(customPasswordChange)}>
                            <div className="form-group mb-2">
                                <label htmlFor="old_password">Old Password:
                                    {errors.old_password &&
                                        <a style={pStyle}>{errors.old_password.message}</a>}
                                </label>
                                <input type="password" className="form-control"
                                       {...register("old_password")} name="old_password"/>

                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="password">Password:
                                    {errors.password &&
                                        <a style={pStyle}>{errors.password.message}</a>}
                                </label>
                                <input type="password" className="form-control"
                                       {...register("password")} name="password"/>

                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="confirm_password">Confirm Password:
                                    {errors.confirm_password &&
                                        <a style={pStyle}>{errors.confirm_password.message}</a>}
                                </label>
                                <input type="password" className="form-control"
                                       {...register("confirm_password")} name="confirm_password"/>

                            </div>
                            <div className="form-group mb-2">
                                <button type="submit" className="btn btn-primary">
                                    <i className="bi bi-lock-fill"></i> Update Password
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            </main>
        </React.Fragment>


    );
}

export default UpdateUserComponents;
