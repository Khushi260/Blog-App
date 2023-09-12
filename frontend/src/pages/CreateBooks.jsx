import { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const baseUrl = 'http://localhost:5555'; // Define your base URL here

const CreateBooks = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    publishYear: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleSaveBook = () => {
    setLoading(true);
    axios
      .post(`${baseUrl}/books`, bookData) // Use baseUrl here
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.error('An error occurred:', error);
      });
  };

  return (
    
    <div className='p-4 h-screen bg-sky-50'>
      
      <BackButton />
      <h1 className='text-4xl my-4 text-center mb-20 font-bold'>Add a Book</h1>
      {loading ? <Spinner /> : null}
      <div className='flex flex-col border-2 border-sky-400  rounded-xl w-96 mx-auto p-10 bg-white'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700 font-semibold mb-2' >Title</label>
          <input
            type='text'
            name='title'
            value={bookData.title}
            onChange={handleInputChange}
            className='border-2 border-gray-700 px-4 py-2 w-full rounded-md'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700 font-semibold mb-2 '>Author</label>
          <input
            type='text'
            name='author'
            value={bookData.author}
            onChange={handleInputChange}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700 font-semibold mb-2'>Publish Year</label>
          <input
            type='number'
            name='publishYear'
            value={bookData.publishYear}
            onChange={handleInputChange}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md'
          />
        </div>
        <button className='p-2 bg-sky-900 mt-8 text-white rounded-lg w-full mb-2' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
