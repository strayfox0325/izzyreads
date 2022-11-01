import React, {useEffect, useState} from 'react';
import {Redirect, Route, useHistory} from "react-router-dom";
import MasterLayout from "./layouts/admin/MasterLayout";
import axios from "axios";
import swal from "sweetalert";

function AdminPrivateRoute({...rest}) {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        axios.get(`/api/isAuthenticated`).then(res => {
            if (res.status === 200) {
                setAuthenticated(true);
            }
            setLoading(false);
        });

        return () => {
            setAuthenticated(false);
        };
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            swal("Unauthorized", err.response.data.message, "warning");
            history.push("/");
        }
        return Promise.reject(err);
    });

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <Route {...rest}
               render={({props, location}) =>
                   authenticated ?
                       // localStorage.getItem('auth_token') ?
                       (<MasterLayout {...props} />) :
                       (<Redirect to={{pathname: "/login", state: {from: location}}}/>)
               }
        />
    );
}

export default AdminPrivateRoute;