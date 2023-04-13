import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";
import api from "../../../../lib/api";

function ShowVideo() {
    const navigate = useNavigate();
    const [LearningVideo, setLearningVideo] = useState([]);

    let getVideo = () => {
        api.get("/lv").then((res) => {
            setLearningVideo(res.data.lv);
        });
    }

    useEffect(() => {
        getVideo();
    }, []);


    const handleDelete = (id) => {
        Swal.fire({
            title: 'Do you want to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/lv/${id}`).then((res) => {
                    if (res.data.success) {
                        Swal.fire(
                            'Deleted!',
                            'Video has been deleted.',
                            'success'
                        );
                        getVideo();
                    }
                });
            }
        })
    };

    const updateData = (id) => {
        navigate(`/update-video/${id}`);
    }

    return (<React.Fragment>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <h1 className="card-title-dp">
                            <i className="bi bi-bag-plus-fill"></i> Video  List
                            <Link to={`/add-video`} className="btn btn-primary float-end">
                                <i className="bi bi-calendar-check-fill"></i> Add  Video
                            </Link>

                        </h1>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Video</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {LearningVideo && LearningVideo.map((video, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{++index}</td>
                                        <td>{video.type}</td>
                                        <td>{video.title}</td>
                                        <td>{video.price}</td>
                                        <td>{video.description}</td>
                                        <td>
                                            <video width="100%" height="100" controls>
                                                <source src={video.videoUrl}/>
                                            </video>
                                        </td>
                                        <td>
                                            <button onClick={() => updateData(video._id)}
                                                    className="btn btn-success">
                                                <i className="bi bi-pencil-square"></i> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(video._id)}
                                                className="btn btn-danger">
                                                <i className="bi bi-trash"></i> Delete
                                            </button>
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

export default ShowVideo