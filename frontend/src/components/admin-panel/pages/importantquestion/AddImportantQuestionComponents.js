import React, {useState, useRef} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import Swal from "sweetalert2";

import {useDispatch} from "react-redux";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import {Link} from "react-router-dom";
import api from "../../../../lib/api";


const iqSchema = yup.object().shape({
    type: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
});

function AddImportantQuestionComponents() {
    const dispatch = useDispatch();
    const {
        setValue,
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(iqSchema)
    });
    let pStyle = {
        color: "#f60000",
    }

    const addImportantQuestion = (data) => {
        let sendData = new FormData();
        sendData.append('type', data.type);
        sendData.append('title', data.title);
        sendData.append('description', data.description);
        sendData.append("image", data.image ?? "");
        api.post("/iq", sendData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res.data.success) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
            }
        }).catch((err) => {
            console.log(err);
        });


    }
    return (<React.Fragment>
        <AdminHeaderComponents/>
        <AdminAsideComponents/>
        <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
            <div className="row">
                <div className="col-md-12 mb-4">
                    <h1>
                        <i className="bi bi-bag-plus-fill"></i> Add Important Question
                        <Link to="/show-imp-question" className="btn btn-primary float-end">
                            <i className="bi bi-arrow-right-square-fill"></i> Show Important Question
                        </Link>
                    </h1>
                    <hr/>
                </div>
                <div className="col-md-12">
                    <form action="" onSubmit={handleSubmit(addImportantQuestion)}>
                        <div className="form-group mb-4">
                            <label htmlFor="title">Type:
                                {errors.type && <a style={pStyle}>{errors.type.message}</a>}
                            </label>
                            <select name="type" {...register("type")} className="form-control">
                                <option value="">Select Type</option>
                                <option value="MBBS">MBBS</option>
                                <option value="Engineering">Engineering</option>
                                <option value="LokSewa">LokSewa</option>
                            </select>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="title">Title:
                                {errors.title && <a style={pStyle}>{errors.title.message}</a>}
                            </label>
                            <input type="text" name="title"
                                   {...register("title")}
                                   className="form-control"/>
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="description">Description:
                                {errors.description && <a style={pStyle}>{errors.description.message}</a>}
                            </label>
                            <textarea name="description"
                                      {...register("description")}
                                      className="form-control"/>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="images">Images:

                            </label>
                            <input type="file" name="image" required
                                   className="form-control"
                                   onChange={(e) => setValue('image', e.target.files[0])}/>
                        </div>
                        <div className="form-group mb-4">
                            <button className="btn btn-success">
                                <i className="bi bi-bag-plus-fill"></i> Add Important Question
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </main>
    </React.Fragment>)
}

export default AddImportantQuestionComponents;


