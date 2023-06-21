import React, { useContext } from "react";
import ContactsContext from "../../context/contacts/contactsContext";

const ContactItem = ({ _id, name, type, email, phone }) => {
  const contactsContext = useContext(ContactsContext);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Delete entry for ${name} from Contact Keeper?`
    );
    if (confirmDelete) {
      contactsContext.deleteContact(_id);
      contactsContext.clearCurrentContact();
    }
  };

  const handleEdit = () => {
    contactsContext.setCurrentContact(_id);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          className={`badge ${
            type === "professional" ? "badge-success" : "badge-primary"
          }`}
        >
          {type}
        </span>
      </h3>
      <ul>
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={handleEdit}>
          <i className="fas fa-edit"></i> Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          <i className="fas fa-trash"></i> Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
