import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';
import PropTypes from 'prop-types';


const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl hover:bg-blue-200'>
      <h2 className='absolute top-1 right-2 px-4 py-1 bg-blue-500 rounded-lg text-white hover:text-gray-200 hover:cursor-pointer mt-2 mr-1'>
        {book.publishYear}
      </h2>
      <h4 className='my-2 text-gray-500 text-xs'>id: {book._id}</h4>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-blue-500 text-2xl' />
        <h2 className='my-1'>{book.title}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-blue-500 text-2xl' />
        <h2 className='my-1'>{book.author}</h2>
      </div>
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiShow
          className='text-3xl text-blue-800 hover:text-black cursor-pointer'
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`} title="View Details">
          <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
        </Link>
        <Link to={`/books/edit/${book._id}`} title="Edit book">
          <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
        </Link>
        <Link to={`/books/delete/${book._id}`} title="Delete book">
          <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

BookSingleCard.propTypes = {
    book: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      publishYear: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      // You can specify other properties of the book object here
    }).isRequired,
  };
  

export default BookSingleCard;