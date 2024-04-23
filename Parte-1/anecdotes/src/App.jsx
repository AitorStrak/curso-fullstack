import React, { useState } from 'react';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
);

const Display = ({anecdotes, selected}) => (
    <p>{anecdotes[selected]}</p>
  );

const Votes = ({votes, selected}) => (
    <p>Tiene {votes[selected]} votos.</p>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const getRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  const maxVotes = Math.max(...votes);
  const mostVoted = votes.indexOf(maxVotes);
  const mostVotedAnecdote = anecdotes[mostVoted];

  return (
    <>
      <div>
        <h2>Anécdota del día</h2>
        <Display anecdotes={anecdotes} selected={selected}/>
        <Votes votes={votes} selected={selected}/>
        <Button onClick={handleVote} text='Votar' />
        <Button onClick={getRandomAnecdote} text = 'Siguiente anécdota'/>
      </div>
      <div>
        <h2>Anécdota con más votos</h2>
        <p>{mostVotedAnecdote}</p>
        <p>Tiene {maxVotes} votos.</p>
      </div>
    </>
  );
};

export default App;

