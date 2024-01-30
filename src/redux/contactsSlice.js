import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactsInitialState = [
  { id: 'id-1', name: 'Holy Davys', number: '+3804761267' },
  { id: 'id-2', name: 'Eryc Richmond', number: '+3806574657' },
  { id: 'id-3', name: 'ELysy Velmort', number: '+3800989845' },
  { id: 'id-4', name: 'Justin Cory', number: '+3807657629' },
];

const contactSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(values) {
        return {
          payload: {
            name: values.name,
            number: values.number,
            id: nanoid(),
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const contactsReducer = contactSlice.reducer;

export const { addContact, deleteContact } = contactSlice.actions;
