import { createContext, useReducer, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import accountServices from '../services/accountServices'; // Adjust path as needed

// Action types
const ActionTypes = {
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT',
  UPDATE_PERSONAL_INFO: 'UPDATE_PERSONAL_INFO',
  UPDATE_BILLING_ADDRESS: 'UPDATE_BILLING_ADDRESS',
  UPDATE_DELIVERY: 'UPDATE_DELIVERY',
  UPDATE_PAYMENT_OPTION: 'UPDATE_PAYMENT_OPTION',
};

// Initial state for account data
const initialState = {
  userId: null,
  personalInfo: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
  },
  billingAddress: {
    address: '',
    city: '',
    pincode: '',
    state: '',
  },
  delivery: {
    mobileNumber: '',
  },
  paymentInfo: {
    paymentType: '',
  },
};

// Reducer function to manage account state
const accountReducer = (state, action) => {
  console.log('Reducer Action:', action.type, 'Payload:', action.payload);
  switch (action.type) {
    case ActionTypes.LOG_IN:
      return { ...state, ...action.payload };
    case ActionTypes.LOG_OUT:
      return initialState;
    case ActionTypes.UPDATE_PERSONAL_INFO:
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } };
    case ActionTypes.UPDATE_BILLING_ADDRESS:
      return { ...state, billingAddress: { ...state.billingAddress, ...action.payload } };
    case ActionTypes.UPDATE_DELIVERY:
      return { ...state, delivery: { ...state.delivery, ...action.payload } };
    case ActionTypes.UPDATE_PAYMENT_OPTION:
      return { ...state, paymentOption: action.payload };
    default:
      return state;
  }
};

// Create the context
const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [account, dispatch] = useReducer(accountReducer, initialState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInRegistration, setIsInRegistration] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load account data from localStorage on initial render
  useEffect(() => {
    const loadAccountData = async () => {
      try {
        const storedAccount = JSON.parse(localStorage.getItem('account'));
        console.log('Initial load - Stored account from localStorage:', storedAccount);
        if (storedAccount && storedAccount.userId) {
          dispatch({ type: ActionTypes.LOG_IN, payload: storedAccount });
          setIsLoggedIn(true);
          console.log('Initial load - Set isLoggedIn to true');
        } else {
          setIsLoggedIn(false);
          console.log('Initial load - No valid account data, set isLoggedIn to false');
        }
      } catch (error) {
        console.error('Error loading account from localStorage:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
        console.log('Initial load - Set isLoading to false');
      }
    };

    loadAccountData();
  }, []);

  // Save account data to localStorage whenever it changes
  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      try {
        console.log('Saving account to localStorage:', account);
        localStorage.setItem('account', JSON.stringify(account));
      } catch (error) {
        console.error('Error saving account to localStorage:', error);
      }
    }
  }, [account, isLoggedIn, isLoading]);

  const loginUser  = async (credentials) => {
    try {
      const userData = await accountServices.login(credentials); // Fetch user data from backend
      dispatch({ type: ActionTypes.LOG_IN, payload: userData });
      setIsLoggedIn(true);
      localStorage.setItem('account', JSON.stringify(userData));
      navigate('/profile'); // Redirect to profile
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Handle error in the component
    }
  };

  const logOutUser = () => {
    try {
      dispatch({ type: ActionTypes.LOG_OUT });
      setIsLoggedIn(false);
      setIsInRegistration(false);
      localStorage.removeItem('account');
      console.log('User logged out');
      navigate('/myacc');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const startRegistration = () => {
    setIsInRegistration(true);
    setIsLoggedIn(true);
  };

  const completeRegistration = (userData) => {
    try {
        // Ensure we have a userId
        const completeUserData = {
            ...userData,
            userId: userData.userId || userData._id?.toString()
        };
        
        dispatch({ type: ActionTypes.LOG_IN, payload: completeUserData });
        setIsLoggedIn(true);
        setIsInRegistration(false);
        localStorage.setItem('account', JSON.stringify(completeUserData));
        console.log('Registration completed:', completeUserData);
        navigate('/profile');
    } catch (error) {
        console.error('Error during registration:', error);
        setIsLoggedIn(false);
    }
};

  const updatePersonalInfo = (data) => {
    if (!isLoggedIn) {
      console.warn('Cannot update personal info: User is not logged in.');
      return;
    }
    dispatch({ type: ActionTypes.UPDATE_PERSONAL_INFO, payload: data });
  };

  const updateBillingAddress = (data) => {
    if (!isLoggedIn) {
      console.warn('Cannot update billing address: User is not logged in.');
      return;
    }
    dispatch({ type: ActionTypes.UPDATE_BILLING_ADDRESS, payload: data });
  };

  const updateDelivery = (data) => {
    if (!isLoggedIn) {
      console.warn('Cannot update delivery details: User is not logged in.');
      return;
    }
    dispatch({ type: ActionTypes.UPDATE_DELIVERY, payload: data });
  };

  const updatePaymentOption = (option) => {
    if (!isLoggedIn) {
      console.warn('Cannot update payment option: User is not logged in.');
      return;
    }
    dispatch({ type: ActionTypes.UPDATE_PAYMENT_OPTION, payload: option });
  };

  return (
    <AccountContext.Provider
      value={{
        account,
        isLoggedIn,
        isInRegistration,
        isLoading,
        loginUser,
        logOutUser,
        startRegistration,
        completeRegistration,
        updatePersonalInfo,
        updateBillingAddress,
        updateDelivery,
        updatePaymentOption,
      }}
    >
      {isLoading ? <div>Loading...</div> : children}
    </AccountContext.Provider>
  );
};

AccountProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};