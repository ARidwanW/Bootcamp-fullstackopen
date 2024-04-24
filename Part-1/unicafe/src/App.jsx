import { useState } from "react";

const Header = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    // <p>
    //   {props.stat.name} {props.stat.rating}
    // </p>
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  );
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div>
      <table>
        <tr>
          <StatisticLine text={"good"} value={good} />
        </tr>
        <tr>
          <StatisticLine text={"neutral"} value={neutral} />
        </tr>
        <tr>
          <StatisticLine text={"bad"} value={bad} />
        </tr>
        <tr>
          <StatisticLine text={"all"} value={all} />
        </tr>
        <tr>
          <StatisticLine text={"average"} value={average} />
        </tr>
        <tr>
          <StatisticLine text={"positive"} value={positive + "%"} />
        </tr>
      </table>
    </div>
    // <div>
    //   {props.stats.feedback.map((feedbackItem, index) => (
    //     <StatisticLine key={index} stat={feedbackItem} />
    //   ))}
    // </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => {
    console.log("good before", good);
    const updatedGood = good + 1;
    setGood(updatedGood);
    console.log("good after", updatedGood);
  };

  const incrementNeutral = () => {
    console.log("neutral before", neutral);
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    console.log("neutral after", updatedNeutral);
  };

  const incrementBad = () => {
    console.log("bad before", bad);
    const updatedBad = bad + 1;
    setBad(updatedBad);
    console.log("bad after", updatedBad);
  };

  const total = good + neutral + bad;
  const average = total !== 0 ? (good - bad) / total : 0;
  const positivePercentage = total !== 0 ? (good / total) * 100 : 0;

  // const stats = {
  //   feedback: [
  //     {
  //       name: "good",
  //       rating: good,
  //     },
  //     {
  //       name: "neutral",
  //       rating: neutral,
  //     },
  //     {
  //       name: "bad",
  //       rating: bad,
  //     },
  //     {
  //       name: "average",
  //       rating: average,
  //     },
  //     {
  //       name: "positive",
  //       rating: positivePercentage + "%",
  //     },
  //   ],
  // };

  return (
    <div>
      <Header title={"give feedback"} />
      <Button onClick={incrementGood} text={"good"} />
      <Button onClick={incrementNeutral} text={"neutral"} />
      <Button onClick={incrementBad} text={"bad"} />
      <Header title={"statistics"} />
      {/* {total !== 0 ? <Statistics stats={stats} /> : <p>No feedback given</p>} */}
      {total !== 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={total}
          average={average}
          positive={positivePercentage}
        />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
