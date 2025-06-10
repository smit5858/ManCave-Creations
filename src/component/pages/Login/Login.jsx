import { useState } from "react";
import { useAccount } from "../../context/AccountContext";
import "./Login.css";
import Registration from "../Registration/Registration";

const Login = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { loginUser } = useAccount(); // Get loginUser  from context

  const callLogin = () => {
    setShowLogin(true);
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage(""); // Clear previous error message

    try {
      await loginUser({ email, password }); // Call loginUser  with email and password
    } catch (error) {
      setErrorMessage(
        "Invalid email or password. Please try again. " + error.message
      );
    }
  };

  return (
    <>
      {showLogin ? (
        <Registration />
      ) : (
        <div className="log-form">
          <div className="component">
            <div className="component__title">Welcome Back</div>
            <div className="component__text">
              Sign in with your email address and your password.
            </div>

            <form className="component__form" onSubmit={handleLogin}>
              <div className="email">
                <label>Email*</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="password">
                <label>Password*</label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              <div className="button_container">
                <div className="side-btn">
                  <button type="submit" className="login-btn">
                    Sign In
                  </button>
                </div>
                <p>Don&apos;t have a mcc account?</p>
                <p onClick={callLogin}>Create an Account</p>
              </div>
            </form>
          </div>

          <div className="sec-component">
            <p>WHAT YOU WILL FIND IN YOUR MYMCC ACCOUNT</p>
            <ul>
              <li>
                Track your orders
                <hr />
              </li>
              <li>
                View your order history
                <hr />
              </li>
              <li>
                Save your shipping information
                <hr />
              </li>
              <li>
                Manage your account
                <hr />
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
