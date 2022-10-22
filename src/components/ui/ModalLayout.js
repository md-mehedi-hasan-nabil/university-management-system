import { useState } from 'react';

export default function ModalLayout({ children, controller }) {
  const [animation, setAnimation] = useState(false);
  return (
    <div
      onClick={() => setAnimation((prevState) => !prevState)}
      className="overflow-y-auto overflow-x-hidden select-none bg-black bg-opacity-50 backdrop-blur-md absolute top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
        className={`${
          animation ? 'animate-zoomInOut' : 'animate-zoomIn'
        } absolute left-1/2 top-1/2 p-4  w-full max-w-md h-full md:h-auto`}
      >
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={() => controller(false)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
