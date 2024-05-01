import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import { useState } from 'react';

const Authors = (props) => {
  const { data, loading, error } = useQuery(ALL_AUTHORS);

  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [birthYear, setBirthYear] = useState('');

  if (!props.show) {
    return null;
  }

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return error.toString();
  }

  const updateBirthYear = (event) => {
    event.preventDefault();

    console.log({ selectedAuthor, birthYear });
    // TODO perform query
  };

  const authors = data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birth year</h2>
      <select
        value={selectedAuthor}
        onChange={(event) => setSelectedAuthor(event.target.value)}
      >
        {authors.map((author) => (
          <option key={author.id} value={author.name}>
            {author.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={birthYear}
        onChange={(event) => setBirthYear(event.target.value)}
      />
      <button type="submit" onClick={updateBirthYear}>
        update birth year
      </button>
    </div>
  );
};

export default Authors;
