import { useReducer } from "react";
import axios from "axios";
import ContactsContext from "./contactsContext";
import contactsReducer from "./contactsReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  CONTACTS_LOADING
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(contactsReducer, initialState);

  // Get contacts
  const getContacts = async () => {
    dispatch({ type: CONTACTS_LOADING });
    try {
      const response = await axios.get("/api/contacts");
      dispatch({ type: GET_CONTACTS, payload: response.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.data.message });
    }
  };

  // Add contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const response = await axios.post("/api/contacts", contact, config);
      dispatch({ type: ADD_CONTACT, payload: response.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.data.message });
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      await axios.delete(`/api/contacts/${id}`, config);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.message });
    }
  };

  // Update contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const response = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({ type: UPDATE_CONTACT, payload: response.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.message });
    }
  };

  // clear contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // Set current
  const setCurrentContact = (id) => {
    dispatch({ type: SET_CURRENT, payload: id });
  };

  // Clear current contact
  const clearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // clear filter
  const clearFilter = (text) => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.current,
        loading: state.loading,
        addContact,
        getContacts,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts,
        error: state.error,
        filtered: state.filtered
      }}
    >
      {props.children}
    </ContactsContext.Provider>
  );
};

export default ContactState;
