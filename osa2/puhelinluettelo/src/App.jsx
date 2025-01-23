import { useState, useEffect } from 'react';
import phonebookService from './services/phonebook';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('');

  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const showNotification = (message, type) => {
    setNotification(message);
    setNotificationType(type);

    setTimeout(() => {
      setNotification(null);
      setNotificationType('');
    }, 5000);
  };

  const addName = (event) => {
    event.preventDefault();

    if (!newName.trim() || !newNumber.trim()) {
      showNotification('Nimi ja numero ovat pakollisia kenttiä.', 'error');
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName);
    const newPerson = { name: newName, number: newNumber };

    if (existingPerson) {
      if (window.confirm(`${newName} on jo luettelossa. Korvataanko vanha numero uudella?`)) {
        phonebookService
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : updatedPerson
              )
            );
            showNotification(`Henkilön ${existingPerson.name} numero päivitettiin.`, 'success');
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              showNotification(
                `Henkilö ${existingPerson.name} on jo poistettu palvelimelta.`,
                'error'
              );
              setPersons(persons.filter((person) => person.id !== existingPerson.id));
            } else {
              showNotification(
                `Henkilön ${existingPerson.name} päivittäminen epäonnistui.`,
                'error'
              );
            }
          });
      }
    } else {
      phonebookService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          showNotification(`Henkilön ${newPerson.name} lisääminen onnistui.`, 'success');
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          showNotification(
            `Henkilön lisääminen epäonnistui: ${error.response?.data?.error || 'Tuntematon virhe.'}`,
            'error'
          );
        });
    }
  };




  const handleDelete = (id, name) => {
    if (window.confirm(`Delete person ${name}?`)) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          // Poista henkilö paikallisesta tilasta
          setPersons(persons.filter((person) => person.id !== id));
          showNotification(`Henkilö ${name} poistettiin onnistuneesti.`, 'success');
        })
        .catch((error) => {
          console.error('Error deleting person:', error);
          showNotification(`Henkilön ${name} poistaminen epäonnistui.`, 'error');
          setPersons(persons.filter((person) => person.id !== id)); // Päivitä tila varmuuden vuoksi
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
