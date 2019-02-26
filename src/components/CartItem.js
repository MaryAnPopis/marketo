import React from 'react'

const CartItem = props => {
  return (
    <div>
      <img src={props.src} alt={props.alt} />
      <p>{props.name}</p>
      <p>{props.price}</p>
      <div class="quantity buttons_added">
        <input type="button" value="-" class="conj-wc-qty-btn__minus" />
        <input type="number" />
        <input type="button" value="+" class="conj-wc-qty-btn__plus" />
      </div>
      <p>{props.total}</p>
      <button>delete</button>
    </div>
  )
}

export default CartItem
