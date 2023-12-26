import { current } from "@reduxjs/toolkit";
import axios from "../utils/axios-customsize";

export const loginApi = (username, password) => {
    return axios.post('/api/v1/auth/login', { username, password })
}
export const registerApi = (username, email, phone, password) => {
    return axios.post('/api/v1/user/register', { fullName: username, email, phone, password })
}
export const getBookApi = (current, pageSize, sort, range, category) => {


    return axios.get(`/api/v1/book?current=${current}&pageSize=${pageSize}&category=${category}&sort=${sort}&${range}`,
    )
}
export const getBookManeger = () => {
    return axios.get(`/api/v1/book`)
}

export const getCateGory = () => {
    return axios.get('/api/v1/database/category')
}
export const getBookDetail = (id) => {
    return axios.get(`/api/v1/book/${id}`)
}
export const refeshToken = () => {
    return axios.get('/api/v1/auth/account')
}
export const getAllUser = () => {
    return axios.get('/api/v1/user')
}
export const editUser = (_id, fullName, phone) => {
    return axios.put('/api/v1/user', { _id, fullName, phone })
}
export const deleteUser = (id) => {
    return axios.delete(`/api/v1/user/${id}`)
}
export const createUser = (fullName, password, email, phone) => {
    return axios.post('/api/v1/user', { fullName, password, email, phone })
}
export const updateBook = (id, author, category, mainText, price, quantity, sold, thumbnail, slider) => {

    return axios.put(`/api/v1/book/${id}`, { author, category, mainText, price, quantity, sold, thumbnail, slider })
}
export const createBook = (author, category, mainText, price, quantity, sold, thumbnail, slider) => {

    return axios.post('/api/v1/book', { author, category, mainText, price, quantity, sold, thumbnail, slider })
}
export const deleteBook = (id) => {
    return axios.delete(`/api/v1/book/${id}`)
}
export const logout = () => {
    return axios.post('/api/v1/auth/logout')
}
export const callUploadBookImg = (fileImg) => {

    const bodyFormData = new FormData();

    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        },
    });
}
export const callOrder = (order) => {
    return axios.post('/api/v1/order', order)
}
export const callHistory = () => {
    return axios.get('/api/v1/history')
}
export const callDashboard = () => {
    return axios.get('/api/v1/database/dashboard')
}
export const callOrderLsit = (page, pageSize) => {
    return axios.get(`/api/v1/order?current=${page}&pageSize=${pageSize}`)
}