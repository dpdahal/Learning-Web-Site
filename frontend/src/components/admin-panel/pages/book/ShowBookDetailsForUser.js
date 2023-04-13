import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import api from "../../../../lib/api";

function ShowBookDetailsForUser() {
    const params = useParams();
    const [books, setBooks] = useState([]);

    let getBookByType = () => {
        api.get(`/book/show-book-for-user/${params.type}`).then((response) => {
            setBooks(response.data.books);
        });
    }

    useEffect(() => {
        getBookByType();
    },[]);

    return (<React.Fragment>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <h1 className="card-title-dp">
                            <i className="bi bi-book"></i> Book Details
                        </h1>
                        <hr/>
                    </div>
                    {books.map((book,index) => {
                        return (
                            <div key={index} className="col-md-4">
                                <div className="card">
                                    <img src={book.image} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{book.title}</h5>
                                        <a href="#" className="btn btn-primary">Details</a>
                                    </div>
                                </div>
                            </div>
                    )})}
                </div>
            </main>
        </React.Fragment>
    )
}

export default ShowBookDetailsForUser;