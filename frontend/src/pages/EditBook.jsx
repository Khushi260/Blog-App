import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const baseUrl = 'http://localhost:5555'; // Define your base URL here

const EditBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    publishYear: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/books/${id}`) // Use baseUrl here
      .then((response) => {
        const { title, author, publishYear } = response.data;
        setBookData({
          title,
          author,
          publishYear,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console.', {
          variant: 'error',
        });
        console.error(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = () => {
    const data = {
      title: bookData.title,
      author: bookData.author,
      publishYear: bookData.publishYear,
    };
    setLoading(true);
    axios
      .put(`${baseUrl}/books/${id}`, data) // Use baseUrl here
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className='p-4 h-screen bg-sky-50'>
      <BackButton />
      <h1 className='text-4xl my-4 text-center font-bold mb-20'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-96 mx-auto p-10 bg-white'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black font-semibold'>Title</label>
          <input
            type='text'
            value={bookData.title}
            onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black font-semibold mb-2'>Author</label>
          <input
            type='text'
            value={bookData.author}
            onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black font-semibold mb-2'>Publish Year</label>
          <input
            type='number'
            value={bookData.publishYear}
            onChange={(e) =>
              setBookData({ ...bookData, publishYear: e.target.value })
            }
            className='border-2 border-gray-500 px-4 py-2  w-full mb-2'
          />
        </div>
        <button className='bg-sky-900 mt-8 text-white rounded-lg w-full mb-2 p-2' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
