const initialState = {
    isAuth: false,
    user: {
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    }
}
const loginReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIN':

            return { ...state, isAuth: true, user: action.payload }
        default: return state
    }

}
export default loginReducer