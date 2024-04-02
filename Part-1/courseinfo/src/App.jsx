const Header = (props) => {
  console.log("Header rendered");

  return (
    <h1>{props.course}</h1>
  )
};

// ============================ 1.1 exercise ============================
// const Content = (props) => {
//   return (
//     // it's a best practice using "key" even we dont need it
//     <>
//       {props.contents.map((item, index) => (
//         <p key={index}>
//           {item.part} {item.exercises}
//         </p>
//       ))}
//     </>
//   )
// }

// ============================ 1.2 exercise ============================
const Part = (props) => {
  console.log("Part rendered");

  return (
    <p>
      {props.contents.part} {props.contents.exercises}
    </p>
  );
};

const Content = (props) => {
  console.log("Content rendered");

  return (
    <div>
      <Part contents={props.contents[0]} />
      <Part contents={props.contents[1]} />
      <Part contents={props.contents[2]} />
    </div>
  );
};

const Total = (props) => {
  const total = props.contents.reduce((sum, item) => sum + item.exercises, 0);
  console.log("total:", total);

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const contents = [
    { part: "Fundamental of React", exercises: 10 },
    { part: "Using props to pass data", exercises: 7 },
    { part: "State of a component", exercises: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content contents={contents} />
      <Total contents={contents} />
    </div>
  );
};

export default App;
