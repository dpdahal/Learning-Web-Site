import React, {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import {updateUser} from "../../../../lib/reducers/usersSlice";

import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import api from "../../../../lib/api";


const RegisterSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    gender: yup.string().required(),
});

function UpdateUserComponents() {
    const dispatch = useDispatch();
    const [profileImage, setProfileImage] = useState("");

    const {
        register, setValue, handleSubmit, formState: {errors}
    } = useForm({
        resolver: yupResolver(RegisterSchema)
    });
    let pStyle = {
        color: "#f60000",
    }
    const [profile, setProfile] = useState("");


    const imageHandler = (e) => {
        setProfile(e.target.files[0]);
    }
    const updateUserInfo = (data) => {
        let getUser = localStorage.getItem('user');
        let user = JSON.parse(getUser);
        let sendData = new FormData();
        sendData.append("id", user._id);
        sendData.append('name', data.name);
        sendData.append('email', data.email);
        sendData.append('password', data.password);
        sendData.append('gender', data.gender);
        sendData.append("image", profile);
        dispatch(updateUser(sendData)).then((res) => {
            if (res.payload.success) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${res.payload.success} `,
                    showConfirmButton: true,
                });
                setTimeout(() => {
                    <Navigate to="/login"/>;
                }, 5000)
                getProfileData();

            }

        }, []).catch((err) => {
            console.log(err);
        });
    }

    const getProfileData = () => {
        let getUser = localStorage.getItem('user');
        let user = JSON.parse(getUser);
        setValue("name", user.name);
        setValue("email", user.email);
        setValue("gender", user.gender);
        setProfileImage(user.image);

    }

    useEffect(() => {
        getProfileData();
    }, []);


    return (
        <React.Fragment>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className="row mt-3 mb-5">
                    <div className="col-md-12">
                        <h1><i className="bi bi-pencil-square"></i> Update My Profile
                        </h1>
                        <hr/>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <form action="" onSubmit={handleSubmit(updateUserInfo)}>
                                <div className="form-group mb-2">
                                    <label htmlFor="name">Name:
                                        {errors.name && <a style={pStyle}>{errors.name.message}</a>}
                                    </label>
                                    <input type="text" name="name"
                                           {...register("name")}
                                           className="form-control"/>

                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="email">Email:
                                        {errors.email && <a style={pStyle}>{errors.email.message}</a>}
                                    </label>
                                    <input type="email" className="form-control"
                                           {...register("email")}
                                           readOnly
                                           disabled
                                           name="email"/>

                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="gender">Gender:
                                        {errors.gender && <a style={pStyle}>{errors.gender.message}</a>}
                                    </label>
                                    <select name="gender"  {...register("gender")}
                                            className="form-control">
                                        <option value="">--select gender---</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="image">Image</label>
                                    <input type="file" className="form-control"
                                           onChange={imageHandler}/>
                                </div>
                                <div className="form-group mb-2">
                                    <button className="btn btn-success">
                                        <i className="bi bi-pencil-square"></i> Update User
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-4">
                            <img src={profileImage} className="img-fluid" style={{marginTop: 23}}
                                 alt=""/>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    );
}

export default UpdateUserComponents;
