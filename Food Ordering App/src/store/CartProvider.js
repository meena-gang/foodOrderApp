import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if(action.type ==='ADD'){
        const updatedTotalAmout = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else{
             updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmout
        };

    }
    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        
        const updatedTotalAmout = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else{
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmout
        }

    }

    if(action.type === 'CLEAR'){
       return defaultCartState;
    }
    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, diaspatchCartAction] = useReducer(cartReducer,defaultCartState);

    const addItemCartHandler = (item) => {
        diaspatchCartAction({type: 'ADD', item:item})
    };

    const removeItemCartHandler = (id) => {
        diaspatchCartAction({type: 'REMOVE', id:id})
    };
    
    const clearCartHandler = () => {
        diaspatchCartAction({type: 'CLEAR'})
    };

    

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemCartHandler,
        removeItem: removeItemCartHandler,
        clearCart: clearCartHandler

    }

    return (
        <CartContext.Provider value = {cartContext}>
            {props.children}
        </CartContext.Provider>
    )

}

export default CartProvider;