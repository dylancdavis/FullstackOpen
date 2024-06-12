import { useQuery, useSubscription } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from '../queries';
import { useState } from 'react';

const Books = (props) => {
  const [filteredGenre, setFilteredGenre] = useState(null);
  const { data, loading, error } = useQuery(ALL_BOOKS, {
    variables: { genre: filteredGenre },
  });

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert(`New Book Added: ${data.data.bookAdded.title}`);
    },
  });

  if (!props.show) {
    return null;
  }

  if (loading) return 'Loading...';
  if (error) return error.toString();

  const books = data.allBooks;

  const genres = [...new Set(books.map((b) => b.genres).flat())];

  return (
    <div>
      <h2>books</h2>

      {filteredGenre && <h3>filtering by genre: {filteredGenre}</h3>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button
            key={genre}
            disabled={genre === filteredGenre}
            onClick={() => setFilteredGenre(genre)}
          >
            {genre}
          </button>
        ))}
        <button
          onClick={() => setFilteredGenre(null)}
          disabled={!filteredGenre}
        >
          clear filter
        </button>
      </div>
    </div>
  );
};

export default Books;
