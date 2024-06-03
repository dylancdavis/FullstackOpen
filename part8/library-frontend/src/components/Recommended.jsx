import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';

const Recommended = (props) => {
  const bookQuery = useQuery(ALL_BOOKS);
  const userQuery = useQuery(ME);

  if (!props.show) {
    return null;
  }

  if (bookQuery.loading || userQuery.loading) return 'Loading...';
  if (bookQuery.loading) return bookQuery.uerror.toString();
  if (userQuery.error) return userQuery.callederror.toString();

  const favoriteGenre = userQuery.data.me.favoriteGenre;

  const books = bookQuery.data.allBooks;

  const filteredBooks = favoriteGenre
    ? books.filter((b) => b.genres.includes(favoriteGenre))
    : books;

  return (
    <div>
      <h2>books</h2>

      <h3>books in your favorite genre: {favoriteGenre}</h3>
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
