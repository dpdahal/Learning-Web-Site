import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import api from "../../../../lib/api";
function ShowVideoDetailsForUser() {
    const params = useParams();
    const [books, setBooks] = useState([]);

    let getVideoByType = () => {
        api.get(`/lv/video/${params.type}`).then((response) => {
            setBooks(response.data.video);
        });
    }

    useEffect(() => {
        getVideoByType();
    },[]);

    return (<React.Fragment>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <h1 className="card-title-dp">
                            <i className="bi bi-book"></i> Video List
                        </h1>
                        <hr/>
                    </div>
                    {books.map((book,index) => {
                        return (
                            <div key={index} className="col-md-4">
                                <div className="card">
                                    <video width="100%" height="200" controls controlsList="nodownload">
                                        <source src={book.videoUrl}/>
                                    </video>
                                    <div className="card-body">
                                        <h5 className="card-title">{book.title}</h5>
                                       Rs: {book.price}  <a href="#" className="btn btn-primary">Download</a>
                                    </div>
                                </div>
                            </div>
                        )})}
                </div>
            </main>
        </React.Fragment>
    )

}

export default ShowVideoDetailsForUser;