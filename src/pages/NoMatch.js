import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImage from '../assets/undraw_page_not_found_re_e9o6.svg';

export default function NoMatch() {
  return (
    <div className="h-screen flex flex-col justify-evenly">
      <img className="w-2/4 mx-auto" src={notFoundImage} alt="404" />
      <Link
        to="/"
        className="mx-auto bg-purple-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-600"
      >
        GO TO HOME
      </Link>
    </div>
  );
}
