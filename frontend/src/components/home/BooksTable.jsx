import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import PropTypes from 'prop-types';

const BooksTable = ({ books }) => {
  return (
    <table className='w-full border-separate border-spacing-2 p-24'>
      <thead className='h-16 font-bold text-xl'>
        <tr>
          <th className='border border-slate-600 rounded-md bg-blue-500 text-white'>
            <h1>S. No.</h1>
          </th>
          <th className='border border-slate-600 rounded-md bg-blue-500 text-white'>
            <h1>Title</h1>
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden bg-blue-500 text-white'>
            <h1>Author</h1>
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden bg-blue-500 text-white'>
            Publish Year
          </th>
          <th className='border border-slate-600 rounded-md bg-blue-500 text-white'>
            Operations
          </th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className='h-12 font-semibold'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {book.title}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.author}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.publishYear}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/books/details/${book._id}`} title="View Details">
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/books/edit/${book._id}`} title="Edit Book">
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/books/delete/${book._id}`} title="Delete Book">
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

BooksTable.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      publishYear: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BooksTable;
