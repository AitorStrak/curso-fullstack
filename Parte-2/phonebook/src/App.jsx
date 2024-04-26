import { useState, useEffect } from 'react';
import axios from 'axios';

const Numbers = ({person}) => (
  <p>{person.name} {person.number}</p>
);

const Filter = ({newFilter, handleFilter}) => (
  <div>
      Búsqueda de contactos: <input placeholder='Filtrar contactos' value={newFilter} onChange={handleFilter} />
  </div>
);

const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, addNumber}) => (
  <form onSubmit={addNumber}>
    <h2>Añadir nuevo número</h2>
    <div>
      Nombre: <input placeholder='Nombre de contacto' value={newName}  onChange={handleNameChange}/>
    </div>
    <div>
      Número: <input placeholder='Número de teléfono' value={newNumber}  onChange={handleNumberChange}/>
    </div>
    <button type="submit">Añadir</button>
  </form>
);

const Persons = ({filterName}) => (
  <>
    <h2>Contactos</h2>
      <div>
        {filterName.map(person => 
          <Numbers key={person.id} person={person} />
        )}
      </div>
  </>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setFilter] = useState('');

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data);
      })
  }, []);
  console.log('render', persons.length, 'personas');

  const addNumber = (e) => {
    e.preventDefault();
    const numberObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    
    const nameAdded = persons.map(person => person.name).includes(newName);
    const numberAdded = persons.map(person => person.number).includes(newNumber);
    
    if(!nameAdded && !numberAdded){
      setPersons(persons.concat(numberObject));
      console.log(persons);
      setNewName('');
      setNewNumber('');
    }else{
      alert(`${nameAdded ? newName : newNumber} ya está añadido en la agenda`);
    };
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filterName = persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLocaleLowerCase())
  );

  return (
    <>
      <h2>Agenda telefónica</h2>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNumber={addNumber}      
      />
      <Persons filterName={filterName} />
    </>
  );
};

export default App