import React, {useEffect} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import Swal from "sweetalert2";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import {useParams} from "react-router-dom";
import api from "../../../../lib/api";

const iqSchema = yup.object().shape({
    type: yup.string().required(),
    title: yup.string().required(),
    price: yup.number().required(),
    description: yup.string().required(),
});

function UpdateVideo() {
    const params = useParams();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(iqSchema)
    });
    let pStyle = {
        color: "#f60000",
    }

    let getVideo = () => {
        api.get(`/lv/${params.id}`).then((response) => {
            let lv = response.data.lv;
            setValue("type", lv.type);
            setValue("title", lv.title);
            setValue("price", lv.price);
            setValue("description", lv.description);
        });
    }


    useEffect(() => {
        getVideo();
    }, [params.id]);

    const updateData = (data) => {
        let sendData = new FormData();
        sendData.append('id', params.id);
        sendData.append('type', data.type);
        sendData.append('title', data.title);
        sendData.append('price', data.price);
        sendData.append('description', data.description);
        sendData.append("video", data.video ?? "");
        api.put("/lv/", sendData, {
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
                            <i className="bi bi-pencil-square"></i> Update Video
                        </h1>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <form action="" onSubmit={handleSubmit(updateData)}>
                            <div className="form-group mb-4">
                                <label htmlFor="title">Type:
                                    {errors.type && <a style={pStyle}>{errors.type.message}</a>}
                                </label>
                                <select name="type" {...register("type")} className="form-control">
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
                                <label htmlFor="description">Description:</label>
                                <textarea name="description"
                                          rows="10"
                                          {...register("description")}
                                          className="form-control"/>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="video">Video:

                                </label>
                                <input type="file" name="video"
                                       accept="video/mp4"
                                       className="form-control"
                                       onChange={(e) => setValue('video', e.target.files[0])}/>
                            </div>
                            <div className="form-group mb-4">
                                <button className="btn btn-success">
                                    <i className="bi bi-pencil-square"></i> Update Video
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default UpdateVideo