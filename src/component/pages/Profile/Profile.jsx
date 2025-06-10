import { useState, useEffect } from "react";
import { useAccount } from "../../context/AccountContext";
import accountServices from "../../services/accountServices";
import userOrderServices from "../../services/userOrderServices";
import "./Profile.css";

const Profile = () => {
  const { account, logOutUser } = useAccount();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { personalInfo, billingAddress, paymentInfo } = account || {};

  const logoutbtn = () => {
    logOutUser(); // This already navigates to /myacc
    // Removed window.location.href to avoid full reload
  };

  useEffect(() => {
    const fetchOrders = async () => {
      // Ensure email is available
      if (!account?.personalInfo?.email) {
        console.error("Email is not available");
        return;
      }

      try {
        // Call the service with the email
        const orders = await userOrderServices.getUserOrders(
          account.personalInfo.email
        ); // Ensure this function is defined correctly
        setOrders(orders);
      } catch (error) {
        console.error("Failed to load orders:", error);
        setError("Failed to load orders"); // Set error state for UI feedback
      }
    };

    fetchOrders();
  }, [account?.personalInfo?.email]);

  useEffect(() => {
    accountServices.getAccount().catch((error) => {
      console.error("Error fetching accounts:", error.message);
    });
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-heading">
        <h2>{personalInfo?.firstName || "Account Holder"}</h2>
      </div>
      <div className="profile-section">
        <div className="fst-sec">
          <div className="section-head">
            <h2>My Profile</h2>
          </div>
          <div className="fst-sec-container">
            <div className="hr-line" />

            <div className="contact-pre">
              <div className="user-info">
                <span>Personal Information</span>
                <p>{personalInfo?.firstName + " " + personalInfo?.lastName   || "Not Available"}</p>
                <p>{account?.delivery?.mobileNumber || "Not Available"}</p>
                <p>{personalInfo?.dateOfBirth || "Not Available"}</p>
              </div>
              <div className="user-info">
                <span>Billing Address</span>
                <p className="address">
                  {billingAddress?.address || "Not Available"}
                  <br />
                  {billingAddress?.city || "Not Available"}
                  <br />
                  {billingAddress?.state || "Not Available"} -{" "}
                  {billingAddress?.pinCode || "Not Available"}
                </p>
              </div>
              <div className="user-info">
                <span>Payment Information</span>
                <p>{paymentInfo?.paymentType || "Not Available"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="snd-sec">
          <div className="section-head">
            <h2>My Orders</h2>
          </div>
          <div className="sec-sec-container">
            <div className="hr-line" />
            {loading ? (
              <div className="loading-spinner">Loading orders...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : orders.length === 0 ? (
              <div className="no-orders">You haven&apos;t placed any orders yet</div>
            ) : (
              <div className="orders-grid">
                {orders.map((order) => (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <span className="order-date">
                        {/* {new Date(order._id).toLocaleDateString()} */}
                      </span>
                      <span className="order-status">
                        {/* {order.deliveryStatus}   */}
                      </span>
                    </div>
                    <div className="order-body">
                      <div className="product-info">
                        <div className="product-image">
                          {/* Placeholder for product image */}
                          <div className="image-placeholder"></div>
                        </div>
                        <div className="product-details">
                          <h3>{order.productName}</h3>
                          <p>Quantity: {order.quantity}</p>
                          <p>₹{order.payment.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="logoutbtn">
        <button className="logout" onClick={logoutbtn}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
