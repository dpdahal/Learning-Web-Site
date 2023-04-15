import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from "../../../../lib/api";
function ShowVideoDetailsForUser() {
    const navigate = useNavigate();
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

    const orderBook = async (videoId, price) => {
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        const userId = user._id;
        let response = await api.post(`/lv/video/`, {
            videoId: videoId,
            userId: userId,
            totalPrice: price,
            paymentStatus: "pending"

        });
        navigate(`/video-booking/${response.data.booking._id}`);
    }

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
                                       Rs: {book.price}

                                        <button
                                            onClick={() => orderBook(book._id, book.price)}
                                            className="btn btn-primary">
                                            <i className="bi bi-download"></i> Buy Now
                                        </button>
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