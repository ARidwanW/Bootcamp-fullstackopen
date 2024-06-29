const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  console.log(total);
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      {course.map((c) => (
        <div>
          <Header key={c.id} title={c.name} />
          <Content key={c.id} parts={c.parts} />
          <Total key={c.id} parts={c.parts} />
        </div>
      ))}
    </>
  );
};

export default Course;
