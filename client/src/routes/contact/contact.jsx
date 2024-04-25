import emailjs from "@emailjs/browser";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./contact.scss";

export const ContactPage = () => {
  const form = useRef();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_sxh6m7r", "template_87f90vi", form.current, {
        publicKey: "k_huftjH0y5im-Dag",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setShowSuccessMessage(true);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setError("Failed to send email");
        }
      );
  };

  return (
    <div className="contactPage">
      <div className="formContainer">
        <form className="form" ref={form} onSubmit={sendEmail}>
          <h1>Contact Us</h1>
          <div className="formGroup">
            <label htmlFor="user_name">Name</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="user_email">Email</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submitBtn">
            Send
          </button>
          {error && <span className="error">{error}</span>}
        </form>
        {showSuccessMessage && ( // Conditional rendering of the success message
          <div className="successMessage">
            <p>Email sent successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
