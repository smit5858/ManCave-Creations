import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./SendEmail.css"; // Assuming the CSS is stored in this file

const SendEmail = () => {
  const [result, setResult] = useState("");
  const [message, setMessage] = useState(""); // Track message input
  const maxLength = 1000;

  const notify = () => toast("Wow so easy!");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    const formData = new FormData(event.target);
    formData.append("access_key", "ec775b6f-e7aa-4657-82a2-ad1520652d47");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
        setMessage(""); // Reset the message input after submit
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult("An error occurred while submitting the form.");
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="eu-container">
      <h1>Email us</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title*</label>
        <select id="title" name="title" required>
          <option value="Mr">Mr</option>
          <option value="Ms">Ms</option>
          <option value="Mrs">Mrs</option>
          <option value="Dr">Dr</option>
        </select>

        <label htmlFor="first-name">
          First Name (Input roman characters only)*
        </label>
        <input type="text" id="first-name" name="first-name" required />

        <label htmlFor="last-name">
          Last Name (Input roman characters only)*
        </label>
        <input type="text" id="last-name" name="last-name" required />

        <label htmlFor="email">Email*</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="country">Country/Region*</label>
        <select id="country" name="country" required>
          <option value="India">India</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
        </select>

        <label htmlFor="phone-type">Phone Number</label>
        <div className="eu-phone-container">
          <select id="phone-type" name="phone-type">
            <option value="Mobile">Mobile</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
          </select>
          <select id="country-code" name="country-code">
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+61">+61</option>
          </select>
          <input
            type="tel"
            id="phone-number"
            name="phone-number"
            placeholder="xxxxxxxxxx"
            minLength={6}
            maxLength={10}
            pattern="[6-9][0-9]*"
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

        <label htmlFor="language">Language*</label>
        <select id="language" name="language" required>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
        </select>

        <label htmlFor="subject">Subject of Your Message*</label>
        <select id="subject" name="subject" required>
          <option value="Product Information">Product Information</option>
          <option value="After sales services">After sales services</option>
          <option value="Online purchases">Online purchases</option>
          <option value="Store information">Store information</option>
          <option value="About ManCave Creations Malletier">
            About ManCave Creations Malletier
          </option>
          <option value="Careers">Careers</option>
        </select>

        <label htmlFor="message">Message*</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          maxLength={maxLength}
          required
          value={message}
          onChange={handleMessageChange}
        ></textarea>

        <div className="eu-note">
          <i className="fas fa-info-circle"></i>
          <span>({maxLength - message.length} characters remaining)</span>
        </div>

        <button type="submit" className="eu-submit-btn" onClick={notify}>
          Send Your Message
        </button>
        <ToastContainer />
      </form>

      {result && <p>{result}</p>}
    </div>
  );
};

export default SendEmail;
