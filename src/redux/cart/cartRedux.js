const initialState = {
    cart: []
};

const addCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CART':
            let carts = [...state.cart];
            const item = action.payload;
            let isExistIndex = carts.findIndex(c => c._id === item._id);
            if (isExistIndex > -1) {
                carts[isExistIndex].quantity = carts[isExistIndex].quantity + item.quantity;
            } else {
                carts.push({ quantity: item.quantity, price: item.price, _id: item._id, detail: item.detail });
            }
            return { cart: carts };

        case 'UPDATE_CART':
            let cartsU = [...state.cart];
            const itemU = action.payload;
            const update = cartsU.map((item) => {
                return item._id === itemU._id ? { ...item, quantity: itemU.quantity } : item;
            });

            return { cart: update };

        case 'REMOVE_CART':

            const idsToRemove = action.payload;
            const updatedCart = state.cart.filter(item => !idsToRemove.includes(item._id));
            return { cart: updatedCart };
        default:
            return state;
    }
};

export default addCartReducer;
