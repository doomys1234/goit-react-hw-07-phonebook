import { useDispatch, useSelector } from 'react-redux';
import { useGetContactsQuery, useAddContactsMutation } from 'redux/apiSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { filterItems } from './redux/contactSLice';

import { filterSelector } from './redux/selectors';
import Phonebook from './components/Phonebook/Phonebook';
import Contacts from './components/Contacts/Contacts';
import Filter from './components/Filter/Filter';
import shortid from 'shortid';
import s from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  const valueFilter = useSelector(state => filterSelector(state));
  const { data, isLoading } = useGetContactsQuery();
  const [addItem, { isLoading: isAdding }] = useAddContactsMutation();
  const contacts = data;

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

    addItem(newContact);
    toast.success('Horay! Contact is added :)');
  };

  const filterChange = e => {
    dispatch(filterItems(e.currentTarget.value));
  };

  const getNormalizedContacts = contacts => {
    if (isLoading) {
      return;
    }
    const normalizedFilter = valueFilter.toLowerCase();
    return contacts.filter(item =>
      item.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filteredItems = getNormalizedContacts(contacts);

  return (
    <div className={s.container}>
      <h1 className={s.title}> Phonebook </h1>{' '}
      <Phonebook onSubmit={addContact} adding={isAdding} />{' '}
      <h2 className={s.contacts}> Contacts </h2>
      <Filter value={valueFilter} onChange={filterChange} />{' '}
      {!isLoading ? (
        <Contacts contacts={filteredItems} />
      ) : (
        <h2
          style={{
            textAlign: 'center',
            marginTop: '100px',
          }}
        >
          {'Please wait, loading ...'}
        </h2>
      )}
      <ToastContainer
        position={'top-right'}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={'dark'}
      />{' '}
    </div>
  );
}

export default App;
