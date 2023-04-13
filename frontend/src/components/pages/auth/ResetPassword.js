import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import {useParams} from "react-router-dom";
import api from "../../../lib/api";

const completeSchema = yup.object().shape({
    password: yup.string().required(),
    confirm_password: yup.string().required()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

function ResetPassword() {
    const {
        register, handleSubmit, reset, formState: {errors}
    } = useForm({
        resolver: yupResolver(completeSchema)
    });
    let pStyle = {
        color: "#f60000",
    }
    let params = useParams();


    const resetComplete = (data) => {
        data.token = params.id;
        api.post('/login/password-reset-confirm', data).then((res) => {
            if (res.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Password reset link sent to your email',
                    showConfirmButton: false,
                    timer: 3000
                });
                reset();
            }
            if (res.data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    showConfirmButton: false,
                    timer: 3000
                });

            }

        }).catch((err) => {
            console.log(err);
        });


    }

    return (
        <React.Fragment>
            <div className="container mb-5 mt-5">
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <h1 className="card-title-dp">Reset Password</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <form action="" onSubmit={handleSubmit(resetComplete)}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password:
                                            {errors.password && <span style={pStyle}>{errors.password.message}</span>}
                                        </label>
                                        <input type="password" className="form-control"
                                               {...register("password")} name="password"/>

                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="confirm_password">Confirm Password:
                                            {errors.confirm_password &&
                                                <span style={pStyle}>{errors.confirm_password.message}</span>}
                                        </label>
                                        <input type="password" className="form-control"
                                               {...register("confirm_password")} name="confirm_password"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-5 mt-2">
                                <button className="login-btn">Reset</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </React.Fragment>);
}

export default ResetPassword;
