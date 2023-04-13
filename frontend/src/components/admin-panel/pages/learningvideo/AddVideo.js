import React from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import Swal from "sweetalert2";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import {Link} from "react-router-dom";
import api from "../../../../lib/api";


const lvSchema = yup.object().shape({
    type: yup.string().required(),
    title: yup.string().required(),
    price: yup.number().required(),
    description: yup.string().required(),
});

function AddVideo() {
    const {
        setValue,
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(lvSchema)
    });
    let pStyle = {
        color: "#f60000",
    }

    const addVideo = (data) => {
        let sendData = new FormData();
        sendData.append('type', data.type);
        sendData.append('title', data.title);
        sendData.append('price', data.price);
        sendData.append('description', data.description);
        sendData.append("video", data.video ?? "");
        api.post("/lv", sendData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            if (res.data.success) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Video has been saved',
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
                        <i className="bi bi-bag-plus-fill"></i> Add Video
                        <Link to="/show-video" className="btn btn-primary float-end">
                            <i className="bi bi-arrow-right-square-fill"></i> Show Video
                        </Link>
                    </h1>
                    <hr/>
                </div>
                <div className="col-md-12">
                    <form action="" onSubmit={handleSubmit(addVideo)}>
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
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-4">
                                    <label htmlFor="title">Title:
                                        {errors.title && <a style={pStyle}>{errors.title.message}</a>}
                                    </label>
                                    <input type="text" name="title"
                                           {...register("title")}
                                           className="form-control"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-4">
                                    <label htmlFor="price">Price:
                                        {errors.price && <a style={pStyle}>{errors.price.message}</a>}
                                    </label>
                                    <input type="number" name="price"
                                           {...register("price")}
                                           className="form-control"/>
                                </div>
                            </div>
                        </div>


                        <div className="form-group mb-4">
                            <label htmlFor="description">Description:
                                {errors.description && <a style={pStyle}>{errors.description.message}</a>}
                            </label>
                            <textarea name="description"
                                      {...register("description")}
                                      rows="5"
                                      className="form-control"/>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="video">Video:

                            </label>
                            <input type="file" name="video" required
                                   accept="video/mp4"
                                   className="form-control"
                                   onChange={(e) => setValue('video', e.target.files[0])}/>
                            <span style={{color: 'red'}}>Only Accept mp4 files </span>
                        </div>
                        <div className="form-group mb-4">
                            <button className="btn btn-success">
                                <i className="bi bi-bag-plus-fill"></i> Add Video
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </main>
    </React.Fragment>)
}

export default AddVideo;


