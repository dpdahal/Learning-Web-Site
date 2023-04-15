import React from "react";
import {useDispatch} from "react-redux";

import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {loginUser} from "../../../lib/reducers/usersSlice";
import "./Login.css";

const LoginSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
});

function LoginComponents() {
    const dispatch = useDispatch();
    const {
        setError,
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(LoginSchema)
    });
    let pStyle = {
        color: "#f60000",
    }
    const onSubmit = (data) => {
        dispatch(loginUser(data)).then((res) => {
            if (res.payload.success) {
                localStorage.setItem('token', res.payload.token);
                localStorage.setItem('user', JSON.stringify(res.payload.user));
                window.location.href = "/dashboard";
            }
            if (res.payload.error) {

                if (res.payload.error.email) {
                    setError('email', {type: 'manual', message: res.payload.error.email})
                }

                if (res.payload.error.password) {
                    setError('password', {type: 'manual', message: res.payload.error.password})
                }

            }

        }, [])

    };


    return (
        <React.Fragment>
            <div className="container mt-5 mt-5 mb-5">
                <div className="login-page">
                    <div className="row  justify-content-center">
                        <div className="col-md-4 mb-4">
                            <h1>Sajilo Pathsala Login</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group mb-4">
                                    <label>Email:
                                        {errors.email && <a style={pStyle}>{errors.email.message}</a>}
                                    </label>
                                    <input {...register("email")} type="email" className="form-control"/>

                                </div>
                                <div className="form-group mb-4">
                                    <label>Password:
                                        {errors.password && <a style={pStyle}>{errors.password.message}</a>}
                                    </label>
                                    <input {...register("password")} type="password" className="form-control"/>

                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group mb-5">
                                            <button className="login-btn">
                                                <i className="bi bi-file-lock-fill"></i> Login
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-5">
                                            <Link to="/register">Sign up Account</Link>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-5">

                                            <div className="form-group mb-5">
                                                <Link to="/forgot-password">Forgot Password</Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default LoginComponents;



