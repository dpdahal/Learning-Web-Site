import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import api from "../../../../lib/api";

function BookingBooking() {
    const [bookingData, setBookingData] = useState([]);
    const params = useParams();
    const bookingId = params.id;

    useEffect(() => {
        api.get(`/book/booking/${bookingId}`).then((response) => {
            setBookingData(response.data.bookingData);
        })
    }, []);

    const confirmBooking = async (type) => {
        let sendData = {
            bookingId: bookingId,
            type: type,
        }
        // convert rupee to paisa
        let amount = bookingData.totalPrice * 100;

        const data = {
            return_url: "http://localhost:3000/payment",
            website_url: "http://localhost:3000",
            amount: 1000,
            purchase_order_id: "test123",
            purchase_order_name: "test",
        };

        await api.post("/book/booking-confirm/", sendData).then((response) => {
            axios.post('https://a.khalti.com/api/v2/epayment/initiate/', data, {
                headers: {
                    'Authorization': 'Key 799d17e01c6e4399b81b884833819810',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    const paymentURL = response.data.payment_url;
                    window.location.replace(paymentURL);
                })
                .catch(error => {
                    console.log(error);
                });
        }).catch((error) => {
            console.log(error);
        });
    }

    // show after loading data
    if (bookingData.length === 0) {
        return (
            <React.Fragment>

                <div className="container mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <h1 className="card-title-dp">Booking</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-body bg-light mb-3">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h3 className="card-title-dp">Booking Information</h3>
                                        <p className="card-text-dp">Loading...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>

            <div className="container mb-5 mt-5">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <h1 className="card-title-dp">Booking</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-body bg-light mb-3">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3 className="card-title-dp">Booking Information</h3>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className="card-text-dp">Booking ID: {bookingData._id}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="card-text-dp">Room Price: {bookingData.totalPrice}</p>
                                        </div>

                                        <div className="col-md-6">
                                            <button
                                                onClick={() => confirmBooking('confirm')}
                                                className="btn btn-success">Confirm Booking
                                            </button>
                                            <button
                                                onClick={() => confirmBooking('cancel')}
                                                className="btn btn-danger">Cancel Booking
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default BookingBooking;