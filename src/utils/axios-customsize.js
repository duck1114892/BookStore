import axios from "axios";
const baseUrl = import.meta.env.VITE_BE_URL
const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
instance.interceptors.response.use(
    function (response) {
        if (response && response.data) {
            return response.data;
        } else {
            return response;
        }
    },
    function (error) {
        if (error && error.response && error.response.data) {
            return error.response.data;
        } else {
            return Promise.reject(error);
        }
    }
);
export default instance