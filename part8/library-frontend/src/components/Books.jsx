import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { useState } from 'react';

const Books = (props) => {
  const { data, loading, error } = useQuery(ALL_BOOKS);
  const [filteredGenre, setFilteredGenre] = useState(null);

  if (!props.show) {
    return null;
  }

  if (loading) return 'Loading...';
  if (error) return error.toString();

  const books = data.allBooks;

  const genres = [...new Set(books.map((b) => b.genres).flat())];

  const filteredBooks = filteredGenre
    ? books.filter((b) => b.genres.includes(filteredGenre))
    : books;

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
          {filteredBooks.map((book) => (
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
