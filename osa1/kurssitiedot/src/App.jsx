const Header = (props) => {

  return <h1>{props.course}</h1>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.name} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};
const Part = ({ name, exercises }) => {
  return (
    <p>

      {name} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  let sum = 0;
  for (let i = 0; i < parts.length; i++) {
    sum += parts[i].exercises; // Add each part's exercises to the total
  }
  return <p>Number of exercises {sum}</p>;
};


const App = () => {

  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />

    </div>
  );
};

export default App