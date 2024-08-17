import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500 hover:text-white"
      >
        <div className="flex items-center -mx-1">
          <BiArrowFromRight />
          <span className="mx-1">Previous</span>
        </div>
      </button>

      {[...Array(totalPages).keys()].map((btnNum) => (
        <button
          key={btnNum + 1}
          onClick={() => onPageChange(btnNum + 1)}
          className={`px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md ${
            currentPage === btnNum + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-blue-500 hover:text-white"
          }`}
        >
          {btnNum + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
      >
        <div className="flex items-center -mx-1">
          <span className="mx-1">Next</span>
          <BiArrowFromLeft />
        </div>
      </button>
    </div>
  );
};

export default Pagination;
