const Header = (props) => {
  console.log("Header rendered");
  console.log(props);

  return (
    <h1>{props.title}</h1>
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
// const Part = (props) => {
//   console.log("Part rendered");
//   console.log(props);

//   return (
//     <p>
//       {props.contents.part} {props.contents.exercises}
//     </p>
//   );
// };

// const Content = (props) => {
//   console.log("Content rendered");
//   console.log(props);

//   return (
//     <div>
//       <Part contents={props.contents[0]} />
//       <Part contents={props.contents[1]} />
//       <Part contents={props.contents[2]} />
//     </div>
//   );
// };

// const Total = (props) => {
//   console.log(props);
//   const total = props.contents.reduce((sum, item) => sum + item.exercises, 0);
//   console.log("total:", total);

//   return (
//     <>
//       <p>Number of exercises {total}</p>
//     </>
//   );
// };

// const App = () => {
//   const course = "Half Stack application development";
//   const contents = [
//     { part: "Fundamental of React", exercises: 10 },
//     { part: "Using props to pass data", exercises: 7 },
//     { part: "State of a component", exercises: 14 },
//   ];

//   return (
//     <div>
//       <Header course={course} />
//       <Content contents={contents} />
//       <Total contents={contents} />
//     </div>
//   );
// };

// ============================ 1.3 exercise ============================
const Part = (props) => {
  console.log(props);

  return (
    <>
      <p>
        {Object.entries(props.item).map(([key, value], index) => (
          <span key={index}>{value} </span>
        ))}
      </p>
    </>
  )
}

const Content = (props) => {
  console.log(props);

  return (
    <div>
      {props.contents.map((item, index) => (
        <Part key={index} item={item} />
      ))}
    </div>
  )
}

const Total = (props) => {
  console.log(props);
  const total = props.exercises.reduce((sum, item) => sum + item, 0);
  console.log("total:", total);

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamental of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header title={course} />
      <Content contents={[part1, part2, part3]} />
      <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )
}

// ============================ 1.3 exercise ============================

export default App;
