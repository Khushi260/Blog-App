import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const baseUrl = 'http://localhost:5555'; // Define your base URL here

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  return date.toLocaleString('en-US', options);
};

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/books/${id}`) // Use baseUrl here
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4 h-screen bg-sky-50'>
      <BackButton />
      <h1 className='text-4xl my-4 text-center font-bold '>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex items-center justify-center mt-20'>
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit py-6 px-10 hover:bg-blue-100'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-black font-semibold'>Id : </span>
              <span>{book._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-black font-semibold'>Title : </span>
              <span className='text-black font-semibold'>{book.title}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-black font-semibold'>Author : </span>
              <span className='text-black font-semibold'>{book.author}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-black font-semibold'>Publish Year : </span>
              <span className='text-black font-semibold'>{book.publishYear}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-black font-semibold'>Create Time : </span>
              <span className='text-black font-semibold'>{formatDateTime(book.createdAt)}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-black font-semibold'>Last Update Time : </span>
              <span className='text-black font-semibold'>{formatDateTime(book.updatedAt)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
