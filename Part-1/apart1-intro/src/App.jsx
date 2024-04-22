// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

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

let App = () => {
  const friends = [
    { name: 'Peter', age: 4 },    // this item is an object
    { name: 'Maya', age: 10 },
    { name: 'Alwan', age: 5 }
  ]

  return (
    //?? this rendered as primitive values separately
    <div>
      <p>{friends[0].name} {friends[0].age}</p>   
      <p>{friends[1].name} {friends[1].age}</p>
      <p>Namanya {friends[2].name} umurnya {friends[2].age} tahun</p>
    </div>
  )
}

export default App