import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {
  filterItems,
  addNewContact,
  deleteContactStore,
} from './redux/contactSLice';
import { filterSelector, contactsStore } from './redux/selectors';

import Phonebook from './components/Phonebook/Phonebook';
import Contacts from './components/Contacts/Contacts';
import Filter from './components/Filter/Filter';
import shortid from 'shortid';
import s from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  const valueFilter = useSelector(state => filterSelector(state));
  const contacts = useSelector(state => contactsStore(state));

  const addContact = e => {
    const name = e.currentTarget.elements.name.value;
    const number = e.currentTarget.elements.number.value;
    console.log(name, number);
    if (contacts.find(contact => contact.name === name)) {
      toast.error(`${name} is already exists`);
      
      return;
    }

    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    dispatch(addNewContact(newContact));
  };

  const filterChange = e => {
    dispatch(filterItems(e.currentTarget.value));
  };

  const deleteContact = numId => {
    dispatch(deleteContactStore(numId));
  };

  const normalizedFilter = valueFilter.toLowerCase();

  const filteredItem = contacts.filter(item =>
    item.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <Phonebook onSubmit={addContact} />
      <h2 className={s.contacts}>Contacts</h2>

      <Filter value={valueFilter} onChange={filterChange} />
      {contacts.length ? (
        <Contacts contacts={filteredItem} onClick={deleteContact} />
      ) : (
          <h2 style={{ textAlign: 'center', marginTop: "100px" }}>You do not have contacts yet</h2>
      )}
      <ToastContainer  position={'top-right'}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={'dark'}
      />
    </div>
  );
}

export default App;
