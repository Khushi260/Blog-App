import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import PropTypes from 'prop-types';


const BackButton = ({ destination = '/' }) => {
    return (
      <div className='flex ml-4 mt-4'>
        <Link
          to={destination}
          className='bg-blue-600 text-white px-4 py-1 rounded-lg w-fit h-8'
        >
          <BsArrowLeft className='text-2xl' />
        </Link>
      </div>
    );
  };
  
  BackButton.propTypes = {
    destination: PropTypes.string, // You can specify the expected type here
  };
  
  export default BackButton;
  