const Header = (props) => {
  console.log("Header rendered");
  console.log(props);

  return <h1>{props.course.name}</h1>;
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
// const Part = (props) => {
//   console.log(props);

//   return (
//     <>
//       <p>
//         {Object.entries(props.item).map(([key, value], index) => (
//           <span key={index}>{value} </span>
//         ))}
//       </p>
//     </>
//   )
// }

// const Content = (props) => {
//   console.log(props);

//   return (
//     <div>
//       {props.contents.map((item, index) => (
//         <Part key={index} item={item} />
//       ))}
//     </div>
//   )
// }

// const Total = (props) => {
//   console.log(props);
//   const total = props.exercises.reduce((sum, item) => sum + item, 0);
//   console.log("total:", total);

//   return (
//     <>
//       <p>Number of exercises {total}</p>
//     </>
//   );
// };

// const App = () => {
//   const course = 'Half Stack application development';
//   const part1 = {
//     name: 'Fundamental of React',
//     exercises: 10
//   }
//   const part2 = {
//     name: 'Using props to pass data',
//     exercises: 7
//   }
//   const part3 = {
//     name: 'State of a component',
//     exercises: 14
//   }

//   return (
//     <div>
//       <Header course={course} />
//       <Content contents={[part1, part2, part3]} />
//       <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />
//     </div>
//   )
// }

// ============================ 1.4 exercise ============================

// const Part = (props) => {
//   console.log("Part Rendered.");
//   console.log(props);

//   return (
//     <>
//       <p>
//         {props.part.name} {props.part.exercises}
//       </p>
//     </>
//   );
// };

// const Content = (props) => {
//   console.log("Content Rendered");
//   console.log(props);

//   return (
//     <div>
//       <Part part={props.contents[0]} />
//       <Part part={props.contents[1]} />
//       <Part part={props.contents[2]} />
//     </div>
//   );
// };

// const Total = (props) => {
//   console.log("Total Rendered");
//   const total = props.total.reduce((sum, part) => sum + part.exercises, 0);

//   console.log(total);

//   return (
//     <div>
//       <p>Number of exercises {total}</p>
//       {/* alternatives */}
//       {/* <p>Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}</p> */}
//     </div>
//   );
// };

// const App = () => {
//   const course = "Half Stack application development";
//   const parts = [
//     {
//       name: "Fundamental of React",
//       exercises: 10,
//     },
//     {
//       name: "Using props to pass data",
//       exercises: 7,
//     },
//     {
//       name: "State of component",
//       exercises: 14,
//     },
//   ];

//   return (
//     <div>
//       <Header course={course} />
//       <Content contents={parts} />
//       <Total total={parts} />
//     </div>
//   );
// };

// ============================ 1.5 exercise ============================

const Part = (props) => {
  console.log("Part Rendered.");
  console.log(props);

  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  console.log("Content Rendered.");
  console.log(props);

  return (
    <div>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]} />
      <Part part={props.course.parts[2]} />
    </div>
  );
};

const Total = (props) => {
  console.log("Total Rendered.");
  console.log(props);
  const total = props.course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return (
    <div>
      <p>Number of exercise {total}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamental of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
