import { useState } from "react";
import axios from "axios";
import "./Registration.css";
import Login from "../Login/Login";
import { useAccount } from "../../context/AccountContext";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    emailConfirmation: "",
    password: "",
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const { completeRegistration } = useAccount();
  const navigate = useNavigate();

  const callLogin = () => {
    setShowLogin(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.emailConfirmation)
      newErrors.emailConfirmation = "Email confirmation is required.";
    if (formData.email !== formData.emailConfirmation)
      newErrors.emailConfirmation = "Emails do not match.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    try {
        const response = await axios.post("http://localhost:3000/registration", {
            firstName: formData.firstName, // Don't include title here
            lastName: formData.lastName,
            email: formData.email,
            dateOfBirth: formData.dateOfBirth,
            password: formData.password,
        });

        if (response.data.success) {
            setSuccessMessage("Registration successful!");
            
            // Use the completeRegistration function from context
            completeRegistration(response.data.user);
            
            setErrors({});
            setFormData({
                email: "",
                emailConfirmation: "",
                password: "",
                title: "",
                firstName: "",
                lastName: "",
                dateOfBirth: "",
            });
            navigate("/profile");
        } else {
            setErrors({
                api: response.data.message || "Registration failed. Please try again.",
            });
        }
    } catch (error) {
        console.error('Registration error:', error);
        setErrors({
            api: error.response?.data?.message || "Registration failed. Please try again.",
        });
    }
};

  return (
    <>
      {showLogin ? (
        <Login />
      ) : (
        <div className="reg-form">
          <div className="reg-container fst">
            <h2>Create Your Account</h2>
            
            <p>
              Create your account to have access to a more personalized
              experience.
            </p>
            <p>
              Already have a MyMCC account?{" "}
              <span onClick={callLogin}>Log in here.</span>
            </p>
          </div>
          <div className="reg-container sec">
            {successMessage && <p className="success">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="reg-form-com">
              <div className="form-field">
                <div className="form-con">
                  <label>Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
                <div className="form-con">
                  <label>Email Confirmation*</label>
                  <input
                    type="email"
                    name="emailConfirmation"
                    value={formData.emailConfirmation}
                    onChange={handleChange}
                  />
                  {errors.emailConfirmation && (
                    <span className="error">{errors.emailConfirmation}</span>
                  )}
                </div>
                <div className="form-con">
                  <label>Password*</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>
              </div>
              <div className="form-field">
                <div className="form-con">
                  <label>Title*</label>
                  <select
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select your title
                    </option>
                    <option value="Mr.">Mr</option>
                    <option value="Mrs.">Mrs</option>
                    <option value="Ms.">Ms</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.title && (
                    <span className="error">{errors.title}</span>
                  )}
                </div>
                <div className="form-con">
                  <label>First Name*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <span className="error">{errors.firstName}</span>
                  )}
                </div>
                <div className="form-con">
                  <label>Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <span className="error">{errors.lastName}</span>
                  )}
                </div>
                <div className="form-con">
                  <label>Date Of Birth*</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                  {errors.dateOfBirth && (
                    <span className="error">{errors.dateOfBirth}</span>
                  )}
                </div>
              </div>
              {errors.api && <span className="error">{errors.api}</span>}
            </form>
          </div>
          <div className="reg-container buttons">
            <div className="submit">
              <button
                type="submit"
                className="submit-btn"
                onClick={handleSubmit}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Registration;