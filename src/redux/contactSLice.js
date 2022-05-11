

import { createSlice } from '@reduxjs/toolkit'

const contactReducer = createSlice({
  name: 'contacts',
    initialState: {
        items: [],
        filter:'',
  },
    reducers: {
        addNewContact: (state, action) => {
            state.items.push(action.payload)
        },
        filterItems: (state, action)=>{
    state.filter =action.payload
        },
        deleteContactStore: (state, action) => {
               state.items=state.items.filter(contact => contact.id !== action.payload);

        }

      
    
  },
})

export default contactReducer.reducer
export const { filterItems, addNewContact, deleteContactStore} = contactReducer.actions
