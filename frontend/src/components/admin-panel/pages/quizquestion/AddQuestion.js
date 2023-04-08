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
    prompt: yup.string().required(),
    option1: yup.string().required(),
    option2: yup.string().required(),
    option3: yup.string().required(),
    option4: yup.string().required(),
    answer: yup.string().required(),
});

function AddQuestion() {
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
        sendData.append('prompt', data.prompt);
        sendData.append("image", data.image ?? "");
        sendData.append('optionA', data.option1)
        sendData.append('optionB', data.option2)
        sendData.append('optionC', data.option3)
        sendData.append('optionD', data.option4)
        sendData.append("optionAImage", data.optionAImage ?? "");
        sendData.append("optionBImage", data.optionBImage ?? "");
        sendData.append("optionCImage", data.optionCImage ?? "");
        sendData.append("optionDImage", data.optionDImage ?? "");
        sendData.append('answer', data.answer)
        api.post('/question', sendData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response.data)
        }).catch((err) => {
            console.log(err)
        })


    }
    return (<React.Fragment>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                <div className="row">
                    <div className="col-md-12 mb-2">
                        <h1>
                            <i className="bi bi-bag-plus-fill"></i> Add Question
                            <Link to="/show-video" className="btn btn-primary float-end">
                                <i className="bi bi-arrow-right-square-fill"></i> Show Question
                            </Link>
                        </h1>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <form action="" onSubmit={handleSubmit(addVideo)}>
                            <div className="form-group mb-2">
                                <label htmlFor="title">Type:
                                    {errors.type && <a style={pStyle}>{errors.type.message}</a>}
                                </label>
                                <select name="type" {...register("type")} className="form-control form-control-sm">
                                    <option value="">Select Type</option>
                                    <option value="MBBS">MBBS</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="LokSewa">LokSewa</option>
                                </select>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="Prompt">Prompt:
                                    {errors.prompt && <a style={pStyle}>{errors.prompt.message}</a>}
                                </label>
                                <input type="text" name="prompt"
                                       {...register("prompt")}
                                       className="form-control form-control-sm"/>
                            </div>


                            <div className="form-group mb-2">
                                <label htmlFor="image">Prompt Image:

                                </label>
                                <input type="file" name="image"
                                       className="form-control form-control-sm"
                                       onChange={(e) => setValue('image', e.target.files[0])}/>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <label htmlFor="option1">Option 1:
                                            {errors.option1 && <a style={pStyle}>{errors.option1.message}</a>}
                                        </label>
                                        <input type="text" name="option1"
                                               {...register("option1")}
                                               className="form-control form-control-sm"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <label htmlFor="optionAImage">Option A Image:

                                        </label>
                                        <input type="file" name="optionAImage"
                                               className="form-control form-control-sm"
                                               onChange={(e) => setValue('optionAImage', e.target.files[0])}/>

                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <label htmlFor="option2">Option 2:
                                            {errors.option2 && <a style={pStyle}>{errors.option2.message}</a>}
                                        </label>
                                        <input type="text" name="option2"
                                               {...register("option2")}
                                               className="form-control form-control-sm"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <label htmlFor="optionBImage">optionBImage:

                                        </label>
                                        <input type="file" name="optionBImage"
                                               className="form-control form-control-sm"
                                               onChange={(e) => setValue('optionBImage', e.target.files[0])}/>

                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <label htmlFor="option3">Option 3:
                                            {errors.option3 && <a style={pStyle}>{errors.option3.message}</a>}
                                        </label>
                                        <input type="text" name="option3"
                                               {...register("option3")}
                                               className="form-control form-control-sm"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <label htmlFor="optionCImage">optionCImage:

                                        </label>
                                        <input type="file" name="optionCImage"
                                               className="form-control form-control-sm"
                                               onChange={(e) => setValue('optionCImage', e.target.files[0])}/>

                                    </div>
                                </div>


                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <label htmlFor="option4">Option 4:
                                            {errors.option4 && <a style={pStyle}>{errors.option4.message}</a>}
                                        </label>
                                        <input type="text" name="option4"
                                               {...register("option4")}
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-4">
                                        <label htmlFor="optionDImage">optionDImage:

                                        </label>
                                        <input type="file" name="optionDImage"
                                               className="form-control form-control-sm"
                                               onChange={(e) => setValue('optionDImage', e.target.files[0])}/>

                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="answer">Answer: {errors.answer &&
                                    <a style={pStyle}>{errors.answer.message}</a>}</label>
                                <select name="answer" {...register("answer")} className="form-control form-control-sm"
                                        id="answer">
                                    <option value="">Select Answer</option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                    <option value="option4">Option 4</option>
                                </select>
                            </div>
                            <div className="form-group mb-4">
                                <button className="btn btn-success">
                                    <i className="bi bi-bag-plus-fill"></i> Add Question
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default AddQuestion;


