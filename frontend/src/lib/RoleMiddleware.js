import {Navigate, Outlet} from "react-router-dom";

function RoleMiddleware() {
    const isLogged = window.user.role === 'admin';
    return isLogged ? <Outlet/> : <Navigate to="/dashboard"/>;
}

export default RoleMiddleware;