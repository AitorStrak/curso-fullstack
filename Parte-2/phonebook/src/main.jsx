import ReactDOM from 'react-dom/client'

import App from './App'

const numbers = [
    { name: 'Arto Hellas',  number: 646594031, id: 1 },
    { name: 'Arturo Hell',  number: 123456789, id: 2 },
    { name: 'Ada Lovelace', number: 39445323523, id: 3 },
    { name: 'Dan Abramov',  number: 124234345, id: 4 },
    { name: 'Mary Poppendieck', number: 39236423122, id: 5 }
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <App number={numbers} />
);