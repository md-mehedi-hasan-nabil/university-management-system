import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/seu_low.png';

export default function SideBar() {
  return (
    // <aside class="w-64 sticky top-0 h-screen">
    //   <Link
    //     to="/"
    //     className="inline-flex items-center justify-center h-20 w-20 bg-white"
    //   >
    //     <img src={logo} alt="seu_logo" />
    //   </Link>
    //   <div class="flex flex-col justify-between px-3 py-4 rounded h-screen bg-gray-50">
    //     <ul class="space-y-2">
    //       <li>
    //         <Link
    //           to="/dashboard"
    //           class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
    //         >
    //           <svg
    //             class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
    //             fill="currentColor"
    //             viewBox="0 0 20 20"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
    //             <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
    //           </svg>
    //           <span class="ml-3">Dashboard</span>
    //         </Link>
    //       </li>

    //       <li>
    //         <Link
    //           to="/course-selection"
    //           class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
    //         >
    //           <svg
    //             class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
    //             fill="currentColor"
    //             viewBox="0 0 20 20"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
    //           </svg>
    //           <span class="flex-1 ml-3 whitespace-nowrap">
    //             Course Selection
    //           </span>
    //           <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full">
    //             Pro
    //           </span>
    //         </Link>
    //       </li>

    //       <li>
    //         <Link
    //           to="users"
    //           class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
    //         >
    //           <svg
    //             class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
    //             fill="currentColor"
    //             viewBox="0 0 20 20"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path
    //               fill-rule="evenodd"
    //               d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
    //               clip-rule="evenodd"
    //             ></path>
    //           </svg>
    //           <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
    //         </Link>
    //       </li>
    //     </ul>
    //     <div>
    //       <Link
    //         to=""
    //         class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
    //       >
    //         <svg
    //           aria-hidden="true"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           stroke="currentColor"
    //           className="h-6 w-6"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    //           ></path>
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    //           ></path>
    //         </svg>
    //         <span class="flex-1 ml-3 whitespace-nowrap">Setting</span>
    //       </Link>
    //     </div>
    //   </div>
    // </aside>
    <aside className="hidden sm:flex sm:flex-col max-h-screen sticky top-0">
      <Link
        to="/"
        className="inline-flex items-center justify-center h-20 w-20 bg-white"
      >
        <img src={logo} alt="seu_logo" />
      </Link>
      <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-200">
        <ul class="space-y-2">
          <li>
            <Link
              to="/dashboard"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span class="ml-3">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              to="/course-selection"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">
                Course Selection
              </span>
              <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full">
                Pro
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/users"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
            </Link>
          </li>
        </ul>
        <div>
          <Link
            to="/dashboard"
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <span class="ml-3">Settings</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
