import React, { useContext, useEffect } from "react";
import ContactsContext from "../../context/contacts/contactsContext";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  let { contacts, filtered, getContacts, clearContacts, loading } =
    useContext(ContactsContext);

  useEffect(() => {
    getContacts();
    return () => {
      clearContacts();
    };
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (contacts.length === 0) {
    return <h4>Please add one or more contacts.</h4>;
  }

  const contactsToDisplay = filtered && filtered.length ? filtered : contacts;

  return (
    <>
      {contactsToDisplay.map((contact) => (
        <ContactItem key={contact._id} {...contact} />
      ))}
    </>
  );
};

export default Contacts;
