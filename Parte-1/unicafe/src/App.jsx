import React from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return (
      <>
        <h2>Estadísticas: </h2>
        <p>No hemos recibido opiniones.</p>
      </>
    );
  }
  return (
    <div>
      <h2>Estadísticas: </h2>
      <table>
        <tbody>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='All' value={all} />
          <StatisticLine text='Average' value={average.toFixed(2)} />
          <StatisticLine text='Positive' value={positive.toFixed(2) + '%'} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = React.useState(0);
  const [neutral, setNeutral] = React.useState(0);
  const [bad, setBad] = React.useState(0);
  const [all, setAll] = React.useState(0);
  const [average, setAverage] = React.useState(0);
  const [positive, setPositive] = React.useState(0);

  const handleSetGood = () => {
    setGood(good + 1);
    setAll(all + 1);
    calculateAverage(good + 1, neutral, bad);
    calculatePositive(good + 1, neutral, bad);
  };

  const handleSetNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    calculateAverage(good, neutral + 1, bad);
    calculatePositive(good, neutral + 1, bad);
  };

  const handleSetBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
    calculateAverage(good, neutral, bad + 1);
    calculatePositive(good, neutral, bad + 1);
  };

  const calculateAverage = (good, neutral, bad) => {
    const total = good + neutral + bad;
    const newAverage = (good - bad) / total;
    setAverage(newAverage);
  };

  const calculatePositive = (good, neutral, bad) => {
    const total = good + neutral + bad;
    const newPositive = (good * 100) / total;
    setPositive(newPositive);
  };

  return (
    <>
      <div>
        <h2>¡Queremos saber tu opinión!</h2>
        <Button handleClick={handleSetGood} text='Good' />
        <Button handleClick={handleSetNeutral} text='Neutral' />
        <Button handleClick={handleSetBad} text='Bad' />
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </>
  );
};

export default App;
