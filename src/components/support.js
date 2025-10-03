import React, { useState } from "react";
import "../components/support.css"; 

const generateTicketNumber = () => {
  return Math.floor(Math.random() * 10000);
};

const Support = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const validateForm = () => {
    if (!firstName || !email || !topic) {
      setAlertMessage("Please fill out all required fields.");
      return false;
    }
    if (!email.includes("@")) {
      setAlertMessage("Please enter a valid email address.");
      return false;
    }
    setAlertMessage("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const ticket = generateTicketNumber();
      setTicketNumber(ticket);
    }
  };

  return (
    <div className="support-container">
      <div className="form-container">
        <div className="heading-support">
          <div className="tittle">Support ticket form</div>
          <div className="line"></div>
        </div>
        {alertMessage && <div className="alert">{alertMessage}</div>}
        {!ticketNumber ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Name<span className="required">*</span>
              </label>
              <div className="name-input">
                <input
                  type="text"
                  placeholder="First"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Last"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                Email<span className="required">*</span>
              </label>
              <div className="email-input">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                Topic<span className="required">*</span>
              </label>
              <div className="generalbug">
                What can we help you today?
                <label>
                  <input
                    type="radio"
                    name="topic"
                    value="General"
                    onChange={(e) => setTopic(e.target.value)}
                  />
                  General
                </label>
                <label>
                  <input
                    type="radio"
                    name="topic"
                    value="Bug"
                    onChange={(e) => setTopic(e.target.value)}
                  />
                  Bug
                </label>
              </div>
            </div>

            <div className="form-group description">
              <label>Description (optional)</label>
              <textarea
                placeholder="Description Report"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={!firstName || !email || !topic}
            >
              SEND
            </button>
          </form>
        ) : (
          <div className="ticket-summary">
            <div className="heading-ticket-number">
              <h1>
                Thank you for sending us your report, we will track the problem
                now
              </h1>
            </div>
            <div className="ticket-number">
              <h3>Ticket number: {ticketNumber}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
