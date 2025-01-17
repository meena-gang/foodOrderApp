import { useRef, useState } from 'react';
import Inputs from '../../UI/Inputs';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {

    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount; // converting string to number;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmountNumber);


    }
    return(
        <form className={classes.form} onSubmit = {submitHandler}>
            <Inputs ref = {amountInputRef}
            label = 'Amount'
             input = {{
                    id: "amount_" + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
            }}/>
            <button>+ Add</button>
            {!amountIsValid && <p>please enter a valid amount between 1 to 5</p>}
        </form>
    );
}

export default MealItemForm;