import {
  GET_CONTACTS,
  ADD_CONTACT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  SET_CURRENT,
  UPDATE_CONTACT,
  CONTACT_ERROR,
  CLEAR_CONTACTS,
  CONTACTS_LOADING
} from "../types";

const contactsReducer = (state, action) => {
  switch (action.type) {
    case CONTACTS_LOADING:
      return { ...state, loading: true };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: [],
        current: null,
        filtered: null,
        error: null,
        loading: false
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: state.contacts.concat(action.payload),
        loading: false
      };
    case DELETE_CONTACT:
      const newContacts = state.contacts.filter(
        (contact) => contact._id !== action.payload
      );
      return { ...state, contacts: newContacts, loading: false };
    case SET_CURRENT:
      const contact = state.contacts.find((c) => c._id === action.payload);
      if (contact) {
        return { ...state, current: contact, loading: false };
      }
      return state;
    case CLEAR_CURRENT:
      return { ...state, current: null, loading: false };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
        loading: false
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          return [
            contact.name,
            contact.email,
            contact.phone,
            contact.type
          ].some((item) =>
            item.toLowerCase().includes(action.payload.toLowerCase())
          );
        }),
        loading: false
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CONTACT_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default contactsReducer;
