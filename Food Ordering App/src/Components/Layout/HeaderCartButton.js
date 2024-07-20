import classes from  './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';


const HeaderCartButton = (props) => {

    const[btnIsHighlighted, setBtnIsHighligheted] = useState(false);
    const cartCtx = useContext(CartContext);
    const{items} = cartCtx;

    const numberOfCartItems = items.reduce((currNumber,item) => {return currNumber+item.amount},0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
       if(items.length === 0){
        return;
       }
        setBtnIsHighligheted(true);

        const timer = setTimeout(() => {
            setBtnIsHighligheted(false);
        },300);
        
        return () => {
            clearTimeout(timer);
        }
    }, [items]);
    
    return (
        <button className={btnClasses} onClick={props.onClicked}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>

    );
}

export default HeaderCartButton;