import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from '../queries';
import { useState } from 'react';

const Authors = (props) => {
  const { data, loading, error } = useQuery(ALL_AUTHORS);
  const [updateBirthYear] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [birthYear, setBirthYear] = useState('');

  if (!props.show) return null;
  if (loading) return 'Loading...';
  if (error) return error.toString();

  const handleUpdate = (event) => {
    event.preventDefault();

    updateBirthYear({
      variables: {
        name: selectedAuthor,
        setBornTo: Number(birthYear),
      },
    });
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
      {props.token && <div>
        <h2>Set birth year</h2>
        <select
          value={selectedAuthor}
          onChange={(event) => setSelectedAuthor(event.target.value)}
        >
          <option value="">Select One</option>
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
        <button type="submit" onClick={handleUpdate}>
          update birth year
        </button>
      </div>}
    </div>
  );
};

export default Authors;
