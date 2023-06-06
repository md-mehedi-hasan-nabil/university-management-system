import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useAddCourseAdvisingMutation,
  useEditCourseMutation,
  useGetCoursesQuery,
  useSelectCourseForAdvisingMutation,
} from '../../features/courses/coursesApi';
import CourseLoader from '../ui/CourseLoader';
import Error from '../ui/Error';

export default function Courses() {
  const selectedSections = useSelector(
    (state) => state.auth?.user?.selectedSections
  );

  const [errorShow, setErrorShow] = useState('');
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoursesQuery();
  const [
    editCourse,
    {
      isLoading: isCourseAdvisingLoading,
      isSuccess: isCourseAdvisingSuccess,
      data: courseAdvisingResult,
    },
  ] = useEditCourseMutation();
  
  const [editMode, setEditMode] = useState('');
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [credits, setCredits] = useState('');
  const [limit, setLimit] = useState('');
  const [advised, setAdvised] = useState(''); 
  const [faculty, setFaculty] = useState('');

  console.log(selectedSections)

  useEffect(() => {
    document.title = 'Course Advising Page';
    if (isError) {
      setErrorShow(error?.error);
    }
  }, [isError, error]);

  function handleChange(check, course) {
    // console.log(course);
    if (check) {
      editCourse({
        id: course._id,
        body: {
          courseAdvising: true,
        },
      });
    } else {
      editCourse({
        id: course._id,
        body: {
          courseAdvising: false,
        },
      });
    }
  }

  function handleChangeInfo(courseObj) {
    setEditMode(courseObj._id);
    setCode(courseObj.code);
    setTitle(courseObj.title);
    setCredits(courseObj.credits);
    setAdvised(courseObj.advised);
    setFaculty(courseObj.faculty);
    setLimit(courseObj.limit);
    console.log(courseObj);
  }

  function handleSubmit() {
    editCourse({
      id: editMode,
      body: {
        title,
        credits,
        faculty,
        limit,
        advised,
        code,
      },
    });
    setEditMode('');
  }

  let content;

  if (isLoading) {
    content = <CourseLoader />;
  } else if (isSuccess && !isError && courses?.length > 0) {
    const renderedCourses = courses.map((course, index) => (
      <>
        <tr key={course._id} className="bg-white border-b hover:bg-gray-50">
          <td className="py-4 px-6">{index + 1}</td>
          <td className="p-4 w-4">
            <div className="flex items-center">
              <input
                id="checkbox-table-search-1"
                onChange={(e) => handleChange(e.target.checked, course)}
                type="checkbox"
                checked={course?.courseAdvising}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="checkbox-table-search-1" className="sr-only">
                checkbox
              </label>
            </div>
          </td>
          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
            {editMode === course._id ? (
              <input
                className="w-full bg-slate-200 rounded-md p-1 focus:text-black focus:ring-blue-500"
                type="text"
                name="code"
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
            ) : (
              course.code
            )}
          </td>
          {
            <td className="py-4 px-6">
              {editMode === course._id ? (
                <input
                  className="w-full bg-slate-200 rounded-md p-1 focus:text-black focus:ring-blue-500"
                  type="text"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              ) : (
                course.title
              )}
            </td>
          }
          <td className="py-4 px-6">
            {editMode === course._id ? (
              <input
                className="w-full bg-slate-200 rounded-md p-1 focus:text-black focus:ring-blue-500"
                type="text"
                name="title"
                onChange={(e) => setCredits(e.target.value)}
                value={credits}
              />
            ) : (
              course.credits
            )}
          </td>
          {
            <td className="py-4 px-6">
              {editMode === course._id ? (
                <input
                  className="w-full bg-slate-200 rounded-md p-1 focus:text-black focus:ring-blue-500"
                  type="text"
                  name="title"
                  onChange={(e) => setLimit(e.target.value)}
                  value={limit}
                />
              ) : (
                course.limit
              )}
            </td>
          }
          <td className="py-4 px-6">
            {editMode === course._id ? (
              <input
                className="w-full bg-slate-200 rounded-md p-1 focus:text-black focus:ring-blue-500"
                type="text"
                name="title"
                onChange={(e) => setAdvised(e.target.value)}
                value={advised}
              />
            ) : (
              course.advised
            )}
          </td>
          <td className="py-4 px-6">
            {editMode === course._id ? (
              <input
                className="w-full bg-slate-200 rounded-md p-1 focus:text-black focus:ring-blue-500"
                type="text"
                name="title"
                onChange={(e) => setFaculty(e.target.value)}
                value={faculty}
              />
            ) : (
              course.faculty
            )}
          </td>
          <td className="flex items-center py-4 px-6 space-x-3">
            <button
              className="font-medium text-blue-600"
              onClick={() => handleChangeInfo(course)}
            >
              Edit
            </button>
            <button
              onClick={handleSubmit}
              className={`${
                editMode === course._id ? 'visible' : 'invisible'
              }  font-medium text-red-600`}
            >
              Save
            </button>
          </td>
        </tr>
      </>
    ));

    content = renderedCourses;
  } else if (isError) {
    content = <Error message={errorShow} />;
  }

  return (
    <div className="overflow-x-auto relative sm:rounded-lg">
      <table className="w-full text-sm text-left mt-1 text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              #
            </th>
            <th scope="col" className="py-3 px-6">
              Action
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
              Limit
            </th>
            <th scope="col" className="py-3 px-6">
              Advised
            </th>
            <th scope="col" className="py-3 px-6">
              faculty
            </th>
            <th scope="col" className="py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
}
