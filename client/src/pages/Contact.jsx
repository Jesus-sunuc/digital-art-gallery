import React from "react";
import "../components/contact/contact.scss";

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="container">
      <aside>
        <h2 className="styleh2">Hi, how can we help you?</h2>
        <p>
          Do you have any questions about our service?
          <br />
          We’ll start with some questions and get you to the right place.
        </p>
      </aside>
      <form id="contactForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <br />

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" required />
        <br />

        <label for="service">Reason:</label>
        <select id="service" name="service" required>
          <option value="">Please select</option>

          <optgroup label="I have a question about Subscription">
            <option value="subscription-purchase">
              Question about purchasing a subscription
            </option>
            <option value="licensing-usage">
              Question about licensing and usage
            </option>
          </optgroup>

          <optgroup label="General Inquiry">
            <option value="finding-content">
              Question about finding content
            </option>
            <option value="billing-payment">
              Question about billing, payment or returns
            </option>
            <option value="account-details">
              Question about my account details and settings
            </option>
            <option value="other">Something else</option>
          </optgroup>

          <optgroup label="I have a question about free content">
            <option value="free-content-use">
              Question about how I can use free content
            </option>
            <option value="brand-accounts">
              Question about brand accounts
            </option>
            <option value="specific-image">Question about an image</option>
            <option value="report-infringement">
              Reporting an infringement
            </option>
            <option value="free-content-other">Something else</option>
          </optgroup>
        </select>
        <br />
        <input type="reset" />
        <input type="submit" value="Submit request" />
      </form>
    </div>
  );
}

export default Contact;
