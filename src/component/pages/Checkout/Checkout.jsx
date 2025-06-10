import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Checkout.css";
import { useAccount } from "../../context/AccountContext";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { createOrder, updateUser } from "../../services/orderServices";
import MasterCard from "../../../assets/Master-card.png";
import VisaCard from "../../../assets/visa.png";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState("myInfo");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const { account, isLoggedIn, isLoading, updatePersonalInfo, updateBillingAddress, updateDelivery, updatePaymentOption } = useAccount();
  const { state: cartState } = useCart();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please log in to proceed with checkout.");
      navigate("/myacc");
    }
  }, [isLoggedIn, navigate]);

  const goToNextStep = () => {
    switch (currentStep) {
      case "myInfo": setCurrentStep("myBill"); break;
      case "myBill": setCurrentStep("myDeli"); break;
      case "myDeli": setCurrentStep("myPayment"); break;
      case "myPayment": setCurrentStep("summary"); break;
      default: break;
    }
  };

  const goToPreviousStep = () => {
    switch (currentStep) {
      case "myBill": setCurrentStep("myInfo"); break;
      case "myDeli": setCurrentStep("myBill"); break;
      case "myPayment": setCurrentStep("myDeli"); break;
      case "summary": setCurrentStep("myPayment"); break;
      default: break;
    }
  };

  const completeMyInfo = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const personalInfo = {
      firstName: formData.get("fnm"),
      lastName: formData.get("lnm"),
      dateOfBirth: formData.get("dob"),
    };
    updatePersonalInfo(personalInfo);
    goToNextStep();
  };

  const completeBill = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const billingAddress = {
      address: formData.get("add"),
      city: formData.get("town/city"),
      pincode: formData.get("pin"),
      state: formData.get("state"),
    };
    updateBillingAddress(billingAddress);
    goToNextStep();
  };

  const completeDeli = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const delivery = {
      mobileNumber: formData.get("phone-number"),
    };
    updateDelivery(delivery);
    goToNextStep();
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const paymentOption = formData.get("payment");
    console.log('Selected payment option:', paymentOption); // Should log "Card", "UPI", etc.
    if (!paymentOption) {
      toast.error("Please select a payment option");
      return;
    }
    updatePaymentOption(paymentOption); // Update context
    await handleFinalSubmit(paymentOption); // Pass directly
  };
  
  const handleFinalSubmit = async (paymentOption) => {
    setIsSubmitting(true);
    console.log('Payment option received:', paymentOption); // Debug log
    console.log('Account payment option:', account.paymentOption); // Might lag
    const orderData = {
      cart: cartState.cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        address: account.billingAddress.address,
      })),
      customerName: `${account.personalInfo.firstName} ${account.personalInfo.lastName}`,
      paymentStatus: paymentOption, // Use the passed value directly
      email: account.personalInfo.email,
    };
  
    const userData = {
      firstName: account.personalInfo.firstName,
      lastName: account.personalInfo.lastName,
      dateOfBirth: account.personalInfo.dateOfBirth,
      address: account.billingAddress.address,
      city: account.billingAddress.city,
      state: account.billingAddress.state,
      pincode: account.billingAddress.pincode,
      mobileNumber: account.delivery.mobileNumber,
      paymentStatus: paymentOption, // Use the passed value directly
    };
  
    console.log('userData being sent:', userData); // Debug log
  
    try {
      await createOrder(orderData);
      await updateUser(account.personalInfo.email.toString(), userData);
      dispatch({ type: "CLEAR_CART" });
      toast.success("Order placed successfully!");
      navigate("/cart");
    }  finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout">
      <h2 className="checkout-title">Checkout</h2>

      <div className="form-content">
        <div className="form-title"><h2>My Information</h2></div>
        {currentStep === "myInfo" ? (
          <form onSubmit={completeMyInfo}>
            <div className="name-field">
              <div className="firstname">
                <label>First Name</label>
                <input type="text" name="fnm" defaultValue={account.personalInfo.firstName} required />
              </div>
              <div className="lastname">
                <label>Last Name</label>
                <input type="text" name="lnm" defaultValue={account.personalInfo.lastName} required />
              </div>
            </div>
            <div className="date-field">
              <label>Date Of Birth</label>
              <input type="date" name="dob" defaultValue={account.personalInfo.dateOfBirth} required />
            </div>
            <div className="save-btn">
              <button type="submit" className="save">Save</button>
            </div>
          </form>
        ) : (
          <>
          <div className="edit-tcon">
          <box-icon name='edit-alt' type='solid' onClick={goToPreviousStep}></box-icon>
          </div>
          <div className="myinfo-details">
            
          <div className="user-name">{account.personalInfo.firstName} {account.personalInfo.lastName}</div>
          <div className="user-date">{account.personalInfo.dateOfBirth}</div>
        </div></>
        )}
      </div>

      <div className="form-content">
        <div className="form-title"><h2>Billing Address</h2></div>
        {currentStep === "myBill" ? (
          <form onSubmit={completeBill}>
            <div className="address-field">
              <label>Address</label>
              <input type="text" name="add" defaultValue={account.billingAddress.address} required />
            </div>
            <div className="name-field">
              <div className="firstname">
                <label>Town/City</label>
                <input type="text" name="town/city" defaultValue={account.billingAddress.city} required />
              </div>
              <div className="lastname">
                <label>Pincode</label>
                <input type="text" name="pin" defaultValue={account.billingAddress.pinCode} required />
              </div>
            </div>
            <div className="State-field">
              <label>State</label>
              <select name="state" defaultValue={account.billingAddress.state} required>
                <option value="">Select State</option>
                <option value="Gujrat">Gujrat</option>
                <option value="Maharastra">Maharastra</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Delhi">Delhi</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
            </div>
            <div className="save-btn">
              <button type="submit" className="save">Save</button>
            </div>
          </form>
        ) : (
          <>
          <div className="edit-tcon">
          <box-icon name='edit-alt' type='solid' onClick={goToPreviousStep}></box-icon>
          </div>
          <div className="billing-details">
            <div className="address">{account.billingAddress.address}</div>
            <div className="town/pin">{account.billingAddress.city}, {account.billingAddress.pinCode}</div>
            <div className="state">{account.billingAddress.state}</div>
          </div></>
        )}
      </div>

      <div className="form-content">
        <div className="form-title"><h2>Delivery</h2></div>
        {currentStep === "myDeli" ? (
          <form onSubmit={completeDeli}>
            <div className="Phone-field">
              <label>Mobile Number</label>
              <input
                type="tel"
                id="phone-number"
                name="phone-number"
                defaultValue={account.delivery.mobileNumber}
                minLength={6}
                maxLength={10}
                pattern="[6-9][0-9]*"
                required
                onInput={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  if (value.length > 0 && !/^[6-9]/.test(value)) {
                    e.target.value = "";
                  } else {
                    e.target.value = value;
                  }
                }}
              />
            </div>
            <div className="save-btn">
              <button type="submit" className="save">Save</button>
            </div>
          </form>
        ) : (
          <>
          <div className="edit-tcon">
          <box-icon name='edit-alt' type='solid' onClick={goToPreviousStep}></box-icon>
          </div>
          <div className="delivery-details">
            <div className="mobilenumber">{account.delivery.mobileNumber}</div>
          </div>
          </>
        )}
      </div>

      <div className="form-content">
        <div className="form-title"><h2>Payment</h2></div>
        <form onSubmit={handlePaymentSubmit}>
          <div className="pay-field">
            <label className="pay-field-label">How would you like to pay?</label>
            <div className="payment-option">
              <label className="payment-label">
                <input type="radio" name="payment" value="Card" className="payment-radio" required />
                <span className="payment-text">Card</span>
              </label>
              <img src={MasterCard} alt="Card" className="payment-icon" />
              <img src={VisaCard} alt="Card" className="payment-icon" />
            </div>
            <hr className="payment-divider" />
            <div className="payment-option">
              <label className="payment-label">
                <input type="radio" name="payment" value="Netbanking" className="payment-radio" required />
                <span className="payment-text">Netbanking</span>
              </label>
            </div>
            <hr className="payment-divider" />
            <div className="payment-option">
              <label className="payment-label">
                <input type="radio" name="payment" value="UPI" className="payment-radio" required />
                <span className="payment-text">UPI</span>
              </label>
            </div>
            <hr className="payment-divider" />
            <div className="payment-option">
              <label className="payment-label">
                <input type="radio" name="payment" value="COD" className="payment-radio" required />
                <span className="payment-text">Cash On Delivery</span>
              </label>
            </div>
            <hr className="payment-divider" />
          </div>
          <div className="save-btn">
            <button type="submit" className="save"  onClick={handleFinalSubmit} disabled={isSubmitting}>Complete Checkout</button>
          </div>
        </form>
      </div>


    </div>
  );
};

export default Checkout;