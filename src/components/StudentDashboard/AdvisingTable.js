import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetCoursesQuery } from '../../features/courses/coursesApi';
import CourseLoader from '../ui/CourseLoader';
import Error from '../ui/Error';

export default function AdvisingTable() {
  const { courses } = useSelector((state) => state.courses);
  const selectedSections = useSelector(
    (state) => state?.auth?.userInfo?.selectedSections
  );

  const [errorShow, setErrorShow] = useState('');
  const { isLoading, isSuccess, isError, error } = useGetCoursesQuery();

  useEffect(() => {
    document.title = 'Course Advising Page';
    if (isError) {
      setErrorShow(error?.error);
    }
  }, [isError, error]);

  let content;

  if (isLoading) {
    content = <CourseLoader />;
  } else if (isSuccess && !isError && courses?.length > 0) {
    const renderedCourses = courses
      // .filter((c) => c.courseAdvising)
      .map((course, index) => (
        <tr key={course._id} className="bg-white border-b hover:bg-gray-50">
          <td className="py-4 px-6">{index + 1}</td>

          <th
            scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
          >
            {course.code}
          </th>
          <td className="py-4 px-6">{course.title}</td>
          <td className="py-4 px-6">{course.credits}</td>
          <td className="py-4 px-6">{course.faculty}</td>
        </tr>
      ));

    content = renderedCourses;
  } else if (isError) {
    content = <Error message={errorShow} />;
  }

  return (
    <div className="overflow-x-auto relative sm:rounded-lg">
      <div className="w-80 h-64 overflow-y-auto text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200">
        {/* <h1>Selected Sections</h1> */}
        <h1 className="pl-4 text-lg">Registered Sections</h1>
        <ul>
          {selectedSections?.length > 0 &&
            selectedSections.map((el) => (
              <li
                className="py-2 px-4 w-full font-medium text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                key={el.code}
              >
                {el.title}
              </li>
            ))}
        </ul>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              #
            </th>
            <th scope="col" className="py-3 px-6">
              Code
            </th>
            <th scope="col" className="py-3 px-6">
              Course Name
            </th>
            <th scope="col" className="py-3 px-6">
              Credits
            </th>
            <th scope="col" className="py-3 px-6">
              faculty
            </th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
}
