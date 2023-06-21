import React, { useState, useContext, useEffect } from "react";
import ContactsContext from "../../context/contacts/contactsContext";

const ContactForm = () => {
  const { addContact, currentContact, updateContact, clearCurrentContact } =
    useContext(ContactsContext);

  const baseContact = {
    name: "",
    email: "",
    phone: "",
    type: "personal"
  };

  const [contact, setContact] = useState(baseContact);

  useEffect(() => {
    if (currentContact != null) {
      setContact(currentContact);
    } else {
      setContact(baseContact);
    }
  }, [currentContact]); // eslint-disable-line

  const handleChange = (e) => {
    setContact((prevContact) => {
      return { ...prevContact, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contact.name) {
      console.log("Name is required");
      return;
    }
    if (!(contact.email || contact.phone)) {
      console.log("Email or Phone is required");
      return;
    }
    if (currentContact) {
      updateContact(contact);
      clearCurrentContact();
    } else {
      addContact(contact);
      setContact(baseContact);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-primary">Add Contact</h2>
      <input
        type="text"
        placeholder="Name..."
        name="name"
        value={contact.name}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email..."
        name="email"
        value={contact.email}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Phone number..."
        name="phone"
        value={contact.phone}
        onChange={handleChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        onChange={handleChange}
        checked={contact.type === "personal"}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        onChange={handleChange}
        checked={contact.type === "professional"}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={currentContact ? "Update contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {currentContact && (
        <div>
          <button
            className="btn btn-light btn-block"
            onClick={() => clearCurrentContact()}
          >
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
