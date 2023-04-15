import {Navigate, Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import "../style/admin.css";
import "../style/dashboard.css";
import "../style/bootstrap-icons/bootstrap-icons.css";
import {getAuthUser} from "./reducers/authSlice";

function AuthMiddleware() {
    const isLogged = window.user;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAuthUser(window.user._id));
    });
    return isLogged ? <Outlet/> : window.location.href = "/";
}

export default AuthMiddleware;