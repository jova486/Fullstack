import { useState } from 'react'


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));
  const [selected, setSelected] = useState(0)
  const showRandomAnecdote = () => {

    const allIndices = Array.from({ length: anecdotes.length }, (_, i) => i);
    const possibleIndices = allIndices.filter(index => index !== selected);
    const randomIndex = possibleIndices[Math.floor(Math.random() * possibleIndices.length)];
    setSelected(randomIndex);
  };
  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  };
  const maxVotes = Math.max(...points);
  const maxVotedIndex = points.indexOf(maxVotes);

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={showRandomAnecdote}>next anecdote</button>


      <h1>Anecdote with most votes</h1>
      {maxVotes > 0 ? (
        <>
          <p>{anecdotes[maxVotedIndex]}</p>
          <p>has {maxVotes} votes</p>
        </>
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  )
}

export default App