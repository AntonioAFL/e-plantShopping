import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, calculateTotalItems, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.map(plant => {
        totalAmount += parseFloat(plant.cost.replace('$', '')) * plant.quantity;
    })

    return totalAmount;
  };

  const handleContinueShopping = (e) => {
   onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    const plantToUpdate = {name: item.name, quantity: item.quantity+1};
    dispatch(updateQuantity(plantToUpdate));
    dispatch(calculateTotalItems());
  };

  const handleDecrement = (item) => {
   const plantToUpdate = {name: item.name, quantity: item.quantity-1}
   dispatch(updateQuantity(plantToUpdate));
   dispatch(calculateTotalItems());
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    dispatch(calculateTotalItems());
  };

    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.replace('$', '')) * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


