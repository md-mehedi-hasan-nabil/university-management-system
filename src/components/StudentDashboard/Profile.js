import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  // console.log(auth)
  return (
    <div>
      <div class="mx-auto max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
        <div class="flex justify-end px-4 pt-4">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span class="sr-only">Open dropdown</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
          </button>
        </div>
        <div class="flex flex-col items-center pb-10">
          <img
            className="mb-3 w-24 h-24 rounded-full shadow-lg"
            src={user?.imageUrl}
            alt="profile"
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900">
            {user?.username}
          </h5>
          <span class="text-sm text-gray-500">{user?.email}</span>
          <div class="flex mt-4 space-x-3 md:mt-6">
            <button class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
              See More
            </button>
            <button class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
