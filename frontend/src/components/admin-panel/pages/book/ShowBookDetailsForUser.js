import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from "../../../../lib/api";

function ShowBookDetailsForUser() {
    const navigate = useNavigate();
    const params = useParams();
    const [books, setBooks] = useState([]);

    let getBookByType = () => {
        api.get(`/book/show-book-for-user/${params.type}`).then((response) => {
            setBooks(response.data.books);
        });
    }

    useEffect(() => {
        getBookByType();
    }, []);


    const orderBook = async (bookId, price) => {
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        const userId = user._id;
        let response = await api.post(`/book/book`, {
            bookId: bookId,
            userId: userId,
            totalPrice: price,
            paymentStatus: "pending"

        });
        navigate(`/book-booking/${response.data.booking._id}`);
    }

    return (<React.Fragment>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto mt-4 col-lg-10  px-md-4">
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <h1 className="card-title-dp">
                            <i className="bi bi-book"></i> Book & PDF Details
                        </h1>
                        <hr/>
                    </div>
                    {books.map((book, index) => {
                        return (
                            <div key={index} className="col-md-4">
                                <div className="card">
                                    <h1 className="text-center">
                                        <i className="bi bi-file-earmark-pdf"></i>
                                    </h1>
                                    <div className="card-body">
                                        <h5 className="card-title">{book.title}</h5>
                                        <p>
                                            {book.description}
                                        </p>
                                        <button
                                            onClick={() => orderBook(book._id, book.price)}
                                            className="btn btn-primary">
                                            <i className="bi bi-download"></i> Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
        </React.Fragment>
    )
}

export default ShowBookDetailsForUser;