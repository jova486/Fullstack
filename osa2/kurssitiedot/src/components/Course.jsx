const Header = (props) => {
    return <h1>{props.course}</h1>;
  };

  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
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
    const total = parts.reduce((sum, part) => {
      return sum + part.exercises;
    }, 0);
    return <p>Total of {total} exercises </p>;
  };

  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  };

export default Course;