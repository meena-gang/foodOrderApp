import { Fragment, useContext, useState } from 'react';
import Modal from '../UI/modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import CheckOut from './CheckOut';



const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const[isCheckOut, setIsCheckOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const removeItemHandler = (id) => {
            cartCtx.removeItem(id);
    }

    const addItemhandler = (item) => {
            cartCtx.addItem({...item,amount:1});
    }

    const orderHandler = () => {
        setIsCheckOut(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://my-food-app-76847-default-rtdb.firebaseio.com/orders.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
         });
         setIsSubmitting(false);
         setDidSubmit(true);
         cartCtx.clearCart();
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item)=> (
                <CartItem 
                    key = {item.id} 
                    name = {item.name} 
                    amount = {item.amount} 
                    price = {item.price} 
                    onRemove = {removeItemHandler.bind(null,item.id)} 
                    onAdd = {addItemhandler.bind(null,item)}/>
            ))}
        </ul>
    );

    const modalActions = <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
            </div>;

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}> 
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckOut && <CheckOut  onConfirm = {submitOrderHandler} onCancel = {props.onClose}/>}
            {!isCheckOut && modalActions}  
        </Fragment> 
    );
    
    const isSubmitingModalContent = <p>Sending order data....</p>;
    const didSubmitModalContent = (
        <Fragment>
            <p>Sucessfully sent the order!</p>
            <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            </div>
        </Fragment>
        );

    return (
        <Modal onClose = {props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmitingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );

};

export default Cart;