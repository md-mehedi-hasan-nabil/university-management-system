import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useSelectedSectionMutation,
  useRemovedSectionMutation,
  useGetStudentQuery
} from '../../features/student/studentApi.js';
import { useGetCoursesQuery } from '../../features/courses/coursesApi';

import CourseLoader from '../ui/CourseLoader';
import Error from '../ui/Error';

export default function Courses() {
  const { user } = useSelector((state) => state.auth);

  const [errorShow, setErrorShow] = useState('');
  // get all courses
  const { isLoading, isSuccess: isSuccessFetchCourses, isError: isFetchCoursesError, error: coursesFetchError, refetch: refetchCourses, data: courses } = useGetCoursesQuery();
  // get all advising course of registed user
  const { isSuccess: isSuccessFetchAdvisingCourses, data: advisingCourses, refetch: refetchAdvisingCourses } = useGetStudentQuery({ studentId: user?.id }, {
    skip: user?.id ? false : true
  })

  const [
    addCourseAdvising,
    {
      // isLoading: isCourseAdvisingLoading,
      isSuccess: isCourseAdvisingSuccess,
      data: courseAdvisingResult,
      isError: isCourseAdvisingError,
      error: courseAdvisingError
    },
  ] = useSelectedSectionMutation();

  const [removeCourseAdvising, { isSuccess: isRemoveCourseAdvising }] =
    useRemovedSectionMutation();


  useEffect(() => {
    document.title = 'Course Advising Page';
    if (isFetchCoursesError) {
      setErrorShow(coursesFetchError?.error);
    }
    if (isCourseAdvisingError) {
      toast.error(courseAdvisingError?.data?.error?.message ? courseAdvisingError?.data?.error?.message : "Something is wrong.")
    }

  }, [isFetchCoursesError, coursesFetchError, refetchCourses, refetchAdvisingCourses, isCourseAdvisingError, courseAdvisingError]);

  useEffect(() => {
    if (isCourseAdvisingSuccess) {
      refetchCourses()
      refetchAdvisingCourses()
      toast.success('Add course.');
    }
  }, [isCourseAdvisingSuccess, refetchCourses, refetchAdvisingCourses])


  useEffect(() => {
    if (isRemoveCourseAdvising) {
      refetchCourses()
      refetchAdvisingCourses()
      toast.success('Remove course.');
    }
  }, [isRemoveCourseAdvising, refetchCourses, refetchAdvisingCourses])

  // handle Advising Courses for add and remove course
  function handleChange(check, course) {
    if (check) {
      addCourseAdvising({
        userId: user?.id,
        courseId: course?._id,
      });
    } else {
      removeCourseAdvising({ userId: user.id, courseId: course._id });
    }
  }


  let content;

  if (isLoading) {
    content = <CourseLoader />;
  } else if (isSuccessFetchCourses && !isFetchCoursesError && courses?.length > 0) {
    const renderedCourses = courses
      .filter((c) => c.courseAdvising)
      .map((course, index) => (
        <tr key={course._id} className="bg-white border-b hover:bg-gray-50">
          <td className="py-4 px-6">{index + 1}</td>
          <td className="p-4 w-4">
            <div className="flex items-center">
              <input
                id="checkbox-table-search-1"
                onChange={(e) => handleChange(e.target.checked, course)}
                type="checkbox"

                checked={advisingCourses?.selectedSections?.includes(course._id)}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="checkbox-table-search-1" className="sr-only">
                checkbox
              </label>
            </div>
          </td>
          <th
            scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
          >
            {course.code}
          </th>
          <td className="py-4 px-6">{course.title}</td>
          <td className="py-4 px-6">{course.credits}</td>
          <td className="py-4 px-6">{course.advised}</td>
          <td className="py-4 px-6">{course.limit}</td>
          <td className="py-4 px-6">{course.faculty}</td>
        </tr>
      ));

    content = renderedCourses;
  } else if (isFetchCoursesError) {
    content = <Error message={errorShow} />;
  } else if (courses?.length === 0) {
    content = <td className="text-lg">No Course Found.</td>;
  }

  return (
    <div className="overflow-x-auto relative sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
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
              Advised
            </th>
            <th scope="col" className="py-3 px-6">
              Limit
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
