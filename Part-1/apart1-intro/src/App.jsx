// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { useState } from "react";

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// =========================================================================

// const App = () => {
//   // console.log('Hello from component')

//   const now = new Date();
//   const a = 10;
//   const b = 20;
//   console.log(now, a+b);

//   return (
//     <div>
//       <p>Hello World, it is {now.toString()}</p>
//       <p>
//         {a} plus {b} is {a + b}
//       </p>
//     </div>
//   )
// }

// export default App

// =========================================================================

// const Hello = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <p>
//         Hello World {props.name}, you are {props.age} years old
//       </p>
//     </div>
//   )
// }

// const Footer = () => {    // The first letter must be capitalize
//   return (
//     <div>
//       <p>
//         greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
//         <br /> copied and modified by <a href="https://github.com/aridwanw">ARidwanW</a>
//       </p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter';
//   const age = 10;

//   return (
//     // <div>
//     // using fragment instead of div for root component
//     <>
//       <h1>Greetings</h1>
//       <Hello name='Maya' age={26 + 10} />
//       <Hello name={name} age={age} />
//       <Footer />
//     </>
//     // </div>
//   )
// }

// export default App

// =========================================================================

// const App = () => {
//   const friends = ['Peter ', 'Maya ']

//   return (
//     <div>
//       <p>
//         {friends}
//       </p>
//     </div>
//   )
// }

// export default App

// =========================================================================
//! a Case (Objects are not valid as a React child)
//*In React, the individual things rendered in braces must be primitive values, such as numbers or strings.

// using let for variable just for a test
// let App = () => {
//   const friends = [
//     { name: 'Peter', age: 4 },    // this item is an object
//     { name: 'Maya', age: 10 }
//   ]

//   return (
//     <div>
//       <p>{friends[0]}</p>
//       <p>{friends[1]}</p>
//     </div>
//   )
// }

//?? TO FIX

// let App = () => {
//   const friends = [
//     { name: 'Peter', age: 4 },    // this item is an object
//     { name: 'Maya', age: 10 },
//     { name: 'Alwan', age: 5 }
//   ]

//   return (
//     //?? this rendered as primitive values separately
//     <div>
//       <p>{friends[0].name} {friends[0].age}</p>
//       <p>{friends[1].name} {friends[1].age}</p>
//       <p>Namanya {friends[2].name} umurnya {friends[2].age} tahun</p>
//     </div>
//   )
// }

// export default App

// =========================================================================

// C. Component state, event handlers

// const Hello = (props) => {
//   const bornYear = () => {
//     const yearNow = new Date().getFullYear();
//     return yearNow - props.age;
//   };

//   return (
//     <div>
//       <p>
//         Hello {props.name}, you are {props.age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   );
// };

// const App = () => {
//   const name = "Peter";
//   const age = 10;

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name="name" age={age} />
//     </div>
//   );
// };

// export default App;

// =========================================================================

// C.1 Destructuring

// const Hello = (props) => {
//   const { name, age } = props;
//   const bornYear = new Date().getFullYear() - age;

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were probably born in {bornYear}</p>
//     </div>
//   );
// };

// const Hello = ({ name, age }) => {
//   const bornYear = () => new Date().getFullYear() - age;

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   );
// };

// const App = (props) => {
//   const name = "Peter";
//   const age = 10;
//   const { counter } = props;

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//       <div>
//         {counter}
//       </div>
//     </div>
//   );
// };

// export default App;

// =========================================================================

// C.2 Stateful component

// import { useState } from "react";

// const App = () => {
//   const [counter, setCounter] = useState(0);

//   // const handleClick = () => {
//   //   console.log("clicked");
//   //   setCounter(counter + 1);
//   // };

//   // setTimeout(() => {
//   //   setCounter(counter + 1);
//   // }, 1000);

//   // console.log("rendering...", counter);

//   const increaseByOne = () => setCounter(counter + 1);

//   const setToZero = () => setCounter(0);

//   return (
//     <div>
//       <div>{counter}</div>
//       <button onClick={increaseByOne}>plus</button>
//       <button onClick={setToZero}>zero</button>
//     </div>
//   );
// };

// export default App;

// =========================================================================

// C.2 lift the state up

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onSmash, text }) => <button onClick={onSmash}>{text}</button>;

const App = () => {
  const [counter, setCounter] = useState(0);
  console.log("rendering with counter value", counter);

  const increaseByOne = () => {
    console.log("increasing, value before", counter);
    setCounter(counter + 1);
  };

  const decreaseByOne = () => {
    console.log("decreasing, value before", counter);
    setCounter(counter - 1);
  };

  const setToZero = () => {
    console.log("resetting to zero, value before", counter);
    setCounter(0);
  };

  return (
    <div>
      <Display counter={counter} />
      <Button onSmash={increaseByOne} text="plus" />
      <Button onSmash={setToZero} text="zero" />
      <Button onSmash={decreaseByOne} text="minus" />
    </div>
  );
};

export default App;
