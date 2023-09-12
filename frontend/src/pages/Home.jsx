import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/books')
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const toggleView = () => {
        setShowType(showType === 'table' ? 'card' : 'table');
    };

    return (
        <div className=' relative bg-sky-50'>

            {/* navbar */}
            <div className="sticky top-0 z-50 bg-blue-600">
                <nav className="flex flex-1 items-center justify-between flex-wrap  h-16">

                    <div className="flex items-center flex-shrink-0  ml-6 text-white">
                        <span className='w-[120px] h-[26px] font-inter font-semibold text-lg'><span className='text-xl'>B</span>ookstore</span>
                    </div>


                    <div>
                        <button
                            className='   hover:underline px-4 py-2  mr-6 font-semibold text-lg text-white'
                            onClick={toggleView}
                        >
                            {showType === 'table' ? 'Card View' : 'Table View'}
                        </button>
                    </div>

                </nav>
            </div>


            <div className='overflow-y-hidden'>
                <div className='flex justify-between items-center text-center mt-10 font-bold text-4xl'>
                    <h1 className=' my-8 text-center flex-grow'>Books List</h1>

                </div>

                <div className="flex items-center absolute top-22 right-10  mr-10 mb-6 ">
                    <span className="mr-2">Add a Book</span>
                    <Link to="/books/create" title="Add a Book" className="text-blue-600 text-2xl">
                        <MdOutlineAddBox />
                    </Link>
                </div>

                {/* loader */}

                {loading ? (
                    <Spinner />
                ) : showType === 'table' ? (
                    <BooksTable books={books} />
                ) : (
                    <BooksCard books={books} />
                )}
            </div>



        </div>
    );
};

export default Home;
