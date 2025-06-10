import { createContext, useReducer, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

// Action types
const ActionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  INCREMENT_QUANTITY: 'INCREMENT_QUANTITY',
  DECREMENT_QUANTITY: 'DECREMENT_QUANTITY',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',
  CLEAR_CART: 'CLEAR_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
};

// Initial state
const getInitialCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return Array.isArray(cart) ? cart : [];
  } catch (error) {
    console.error("Error parsing cart from local storage:", error);
    return [];
  }
};

const initialState = {
  cart: getInitialCart(),
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART: {
      const { id, name, price, images, size, quantity } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.id === id && item.size === size
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id,
            name,
            price,
            images,
            size,
            quantity,
          },
        ],
      };
    }

    case ActionTypes.INCREMENT_QUANTITY: {
      const { id, size } = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case ActionTypes.DECREMENT_QUANTITY: {
      const { id, size } = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id && item.size === size && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }

    case ActionTypes.REMOVE_PRODUCT: {
      const { id, size } = action.payload;
      return {
        ...state,
        cart: state.cart.filter((item) => !(item.id === id && item.size === size)),
      };
    }

    case ActionTypes.CLEAR_CART: {
      return {
        ...state,
        cart: [],
      };
    }

    case ActionTypes.UPDATE_QUANTITY: {
      const { id, size, quantity } = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: quantity }
            : item
        ),
      };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Create context
const CartContext = createContext();

// Cart provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);