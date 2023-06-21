import React, { useContext, useEffect, useRef } from "react";
import ContactsContext from "../../context/contacts/contactsContext";

const ContactsFilter = () => {
  const { filterContacts, clearFilter, filtered } = useContext(ContactsContext);
  const text = useRef("");

  useEffect(() => {
    if (filtered == null) {
      text.current.value = "";
    }
  }, [filtered]);

  const handleChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        type="text"
        ref={text}
        placeholder="Filter Contacts..."
        onChange={handleChange}
      />
    </form>
  );
};

export default ContactsFilter;
