import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Recommended = (props) => {
  const { data, loading, error } = useQuery(ALL_BOOKS);

  const filteredGenre = 'debugging';

  if (!props.show) {
    return null;
  }

  if (loading) return 'Loading...';
  if (error) return error.toString();

  const books = data.allBooks;

  const filteredBooks = filteredGenre
    ? books.filter((b) => b.genres.includes(filteredGenre))
    : books;

  return (
    <div>
      <h2>books</h2>

      <h3>books in your favorite genre: {filteredGenre}</h3>
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
    </div>
  );
};

export default Recommended;
