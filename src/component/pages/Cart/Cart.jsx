import {} from "react";
import { useCart } from "../../context/CartContext";
import visa from'../../../assets/visa.png'
import mastercardImg from '../../../assets/Master-Card.png';


import { FaTrashAlt } from "react-icons/fa";
import "./Cart.css";


const Cart = () => {
  const { state, dispatch } = useCart();

  const handleRemove = (id, size) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: { id, size } });
  };

  const calculateTotal = () => {
    return state.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div>
      <div className="ct-header">
        <p>
          Free shipping above Rs.
          {state.cart.map((item) => {
            <span>{item.price.toFixed(2)}</span>;
          })}
        </p>
        <p>Free & flexible 15 days return</p>
        <p>Estimated delivery time: 2-7 days</p>
        <h2>Shopping bag</h2>
      </div>

      <div className="ct-container">
        <div className="ct-shopping-bag">
          {state.cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            state.cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="ct-item">
                <img
                  alt={item.name}
                  height="100"
                  src={`data:${item.images[0].contentType};base64,${item.images[0].data}`}
                  width="100"
                />
                <div className="ct-item-details">
                  <h3>{item.name}</h3>
                  <p className="ct-price">Rs. {item.price.toFixed(2)}</p>
                  <p className="ct-details-line">
                    <span>Art no: {item.id}</span>
                    <span>Size: {item.size}</span>
                  </p>
                  <p className="ct-details-line">
                    <span>Color: {item.color || "N/A"}</span>
                    <span>
                      Total: Rs. {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                  <div className="ct-item-actions">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: {
                            id: item.id,
                            size: item.size,
                            quantity: parseInt(e.target.value),
                          },
                        })
                      }
                    >
                      {[...Array(9).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                    <button onClick={() => handleRemove(item.id, item.size)}>
                      <FaTrashAlt className="ct-trash-icon" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="ct-summary">
         
          <p>Order value: Rs. {calculateTotal().toFixed(2)}</p>
          <p>Delivery: FREE</p>
          <p className="ct-total">Total: Rs. {calculateTotal().toFixed(2)}</p>
          <button onClick={() => window.location.href = `/checkout`}>Continue to checkout</button>
          
          <div className="ct-payment-methods">
            <p>We accept</p>
            <img
              alt="Cash on Delivery"
              height="20"
              src="https://www.abcd.png"    
              width="50"
            />
            <img
              alt="MasterCard"
              height="20"
              src={mastercardImg}
              width="50"
            />
            <img
              alt="Visa"
              height="20"
              src={visa}
              width="50"
            />
          </div>
          <p className="ct-note">
            Prices and delivery costs are not confirmed until you&apos;ve
            reached the checkout. 15 days free returns. Read more about{" "}
            <a href="#">return and refund policy</a>. Customers would receive an
            SMS/WhatsApp notifications regarding deliveries on the registered
            phone number.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
