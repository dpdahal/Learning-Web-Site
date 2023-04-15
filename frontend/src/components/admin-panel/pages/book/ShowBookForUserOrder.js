import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import React, {useEffect, useState} from "react";
import api from "../../../../lib/api";
import {Link} from "react-router-dom";

function ShowBookForUserOrder() {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);

    let token = localStorage.getItem("token");
    api.defaults.headers.common["Authorization"] = `${token}`;
    const [books, setBooks] = useState([]);
    useEffect(() => {
        api.get(`/book/book/order/show-order-by-login/`).then((response) => {
            setBooks(response.data.bookingData);
        });
    }, []);

    const confirmBooking = async (bookingId, type) => {
        let sendData = {
            bookingId: bookingId,
            type: type
        }
        await api.post("/book/booking-confirm/", sendData).then((response) => {
            window.location.href = '/show-book-for-user-order';
        })
    }

    console.log(books)

    if (books.length === 0) {
        return (
            <div>
                <AdminHeaderComponents/>
                <AdminAsideComponents/>
                <main className="col-md-9 ms-sm-auto mt-4 col-lg-10 px-md-4">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="card-title-dp">
                                <i className="bi bi-eye-fill"></i> Booking List
                            </h1>
                            <hr/>
                        </div>
                        <div className="col-md-12">
                            <h1 className="card-title-dp">
                                Sorry, No Booking Found please book a booking and come back
                            </h1>
                        </div>
                    </div>
                </main>
            </div>
        )
    }


    return (<div>
        <AdminHeaderComponents/>
        <AdminAsideComponents/>
        <main className="col-md-9 ms-sm-auto mt-4 col-lg-10 px-md-4">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="card-title-dp">
                        <i className="bi bi-eye-fill"></i> Book And PDF Booking List

                    </h1>
                    <hr/>
                </div>
                <div className="col-md-12">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>S.n</th>
                            <th>Book Title</th>
                            {user.role === 'admin' && <th>Client</th>}
                            <th>Price</th>
                            <th>Payment Status</th>
                            <th>Status</th>
                            <th>Download</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map((book, index) => (
                            <tr key={index}>
                                <td>{++index}</td>
                                <td>{book.bookId.title}</td>
                                {user.role === 'admin' && <td>{book.userId.name}</td>}
                                <td>{book.totalPrice}</td>
                                <td>{book.paymentStatus}</td>
                                <td>{book.status}</td>
                                <td>
                                    {book.paymentStatus === 'paid' ?
                                        <a href={book.bookId.image} target="_blank"
                                           className="btn btn-success btn-sm">
                                            Download <i className="bi bi-check"></i></a>
                                        :
                                        <button className="btn btn-danger btn-sm">Not Download<i
                                            className="bi bi-file-earmark-excel-fill"></i></button>
                                    }

                                </td>
                                <td>

                                    {
                                        (() => {
                                            if (user.role === 'admin' || user.role === 'staff') {
                                                return (
                                                    <React.Fragment>
                                                        {book.status === 'pending' ?
                                                            <div>
                                                                <button
                                                                    onClick={(e) => confirmBooking(book._id, 'approved')}
                                                                    className="btn btn-sm btn-success">Approved
                                                                </button>
                                                                <button
                                                                    onClick={(e) => confirmBooking(book._id, 'reject')}
                                                                    className="btn btn-sm btn-danger">Reject
                                                                </button>
                                                            </div>
                                                            :
                                                            <div></div>
                                                        }
                                                        {book.status === 'approved' ?
                                                            <div>
                                                                <button className="btn btn-sm btn-success">
                                                                    <i className="bi bi-check"></i>
                                                                </button>
                                                            </div>
                                                            : <div></div>
                                                        }

                                                        {book.status === 'reject' ?
                                                            <div>
                                                                <button className="btn btn-sm btn-danger">
                                                                    <i className="bi bi-file-earmark-excel-fill"></i>
                                                                </button>
                                                            </div>
                                                            : <div></div>
                                                        }
                                                    </React.Fragment>
                                                )
                                            } else
                                                return <React.Fragment>
                                                    {book.status === 'approved' ?
                                                        <div>
                                                            <button className="btn btn-sm btn-success">
                                                                <i className="bi bi-check"></i>
                                                            </button>
                                                        </div>
                                                        : <div></div>
                                                    }
                                                    {book.status === 'reject' ?
                                                        <div>
                                                            <button className="btn btn-sm btn-danger">
                                                                <i className="bi bi-file-earmark-excel-fill"></i>
                                                            </button>
                                                        </div>
                                                        : <div></div>
                                                    }
                                                </React.Fragment>
                                        })()
                                    }


                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </main>
    </div>)
}

export default ShowBookForUserOrder