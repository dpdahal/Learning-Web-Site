import React from "react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Login.css";
import api from "../../../lib/api";
import Swal from "sweetalert2";

const resetSchema = yup.object().shape({
    email: yup.string().required(),
});

function ForgotPassword() {
    const {
        reset,
        setError,
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(resetSchema)
    });
    let pStyle = {
        color: "#f60000",
    }
    const onSubmit = (data) => {
        api.post('/login/password-reset', data).then((res) => {
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
                if (res.data.error.email) {
                    setError('email', {type: 'manual', message: res.data.error.email})
                }

            }

        }).catch((err) => {
            console.log(err);
        });

    };


    return (
        <React.Fragment>
            <div className="container login-page mt-5 mt-5 mb-5">
                <div className="row  justify-content-center">
                    <div className="col-md-4 mb-4">
                        <h1>Send Reset Password</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group mb-4">
                                <label>Email:
                                    {errors.email && <span style={pStyle}>{errors.email.message}</span>}
                                </label>
                                <input {...register("email")} type="email"
                                       placeholder="Enter your email"
                                       className="form-control"/>
                            </div>

                            <div className="form-group mb-5">
                                <button className="btn btn-danger">
                                    <i className="bi bi-file-lock-fill"></i> Send
                                </button>
                                <Link to="/" className="float-end">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
}

export default ForgotPassword;



