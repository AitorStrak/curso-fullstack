import { useState } from 'react'
import Numbers from './components/numbers';

const Filter = (props) => {
  console.log(props);
  // <div>
  //     Búsqueda de contactos: <input placeholder='Filtrar contactos' value={newFilter} onChange={handleFilter} />
  // </div>
};

const App = ({number}) => {
  const [persons, setPersons] = useState(number);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setFilter] = useState('');

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
      {/* <Filter ... /> */}
      <div>
        Búsqueda de contactos: <input placeholder='Filtrar contactos' value={newFilter} onChange={handleFilter} />
      </div>
      {/* <PersonForm /> */}
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
      <h2>Contactos</h2>
      {/* <Persons ... /> */}
      <div>
        {filterName.map(person => 
          <Numbers key={person.id} person={person} />
        )}
      </div>
    </>
  );
};

export default App