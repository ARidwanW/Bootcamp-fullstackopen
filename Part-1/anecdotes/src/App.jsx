import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Anecdote = ({ title, text, vote }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{text}</div>
      <div>has {vote} votes</div>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [point, setPoint] = useState(new Uint8Array(anecdotes.length)); // new Array(anecdotes.length).fill(0)

  const shuffleAnecdotes = () => {
    const min = 0;
    const max = anecdotes.length;
    console.log(max);

    //* make it shuffle the different anecdote from previous
    let rand;
    do {
      rand = min + Math.floor(Math.random() * (max - min));
    } while (selected === rand);
    console.log(rand);

    setSelected(rand);
  };

  const incrementVote = (index) => {
    const newPoint = [...point];
    newPoint[index] += 1;
    setPoint(newPoint);
  };

  let max = point[0];
  let maxIndex = 0;
  for (let i = 1; i < point.length; i++) {
    if (point[i] > max) {
      max = point[i];
      maxIndex = i;
    }
  }
  // console.log(maxIndex);

  return (
    <div>
      <Anecdote
        title={"Anecdote of the day"}
        text={anecdotes[selected]}
        vote={point[selected]}
      />
      <Button text={"vote"} onClick={() => incrementVote(selected)} />
      <Button text={"next anecdote"} onClick={shuffleAnecdotes} />
      <Anecdote
        title={"Anecdote with most votes"}
        text={anecdotes[maxIndex]}
        vote={point[maxIndex]}
      />
    </div>
  );
};

export default App;
