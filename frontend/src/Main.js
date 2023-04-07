import React from "react";
import MasterComponents from "./components/MasterComponents";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./style/FrontendStyle.scss";

import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getAuthUser} from "./lib/reducers/authSlice";


function Main() {
    if (localStorage.getItem('user')) {
        {
            let user = localStorage.getItem('user');
            user = JSON.parse(user);
            window.user = user;
        }
    }

    let dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('user')) {
            dispatch(getAuthUser(window.user._id));
        }
    }, []);
    return (
        <React.Fragment>
            <MasterComponents/>
        </React.Fragment>
    )
}


export default Main;
