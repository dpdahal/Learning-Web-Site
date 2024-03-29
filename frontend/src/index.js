import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./lib/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter> <Main/></BrowserRouter>
        </Provider>
    </React.StrictMode>
);

