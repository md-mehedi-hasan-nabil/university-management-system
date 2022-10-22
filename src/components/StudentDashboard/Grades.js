import React from 'react';
import { useSelector } from 'react-redux';

export default function Grades() {
  const { courses } = useSelector((state) => state.courses);
  const selectedSections = useSelector(
    (state) => state?.auth?.userInfo?.selectedSections
  );
  console.log(courses);
  return (
    <div>
      <table>
        <thead>
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
            <th scope="col" className="py-3 px-6">
              Grade
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedSections?.length > 0 &&
            selectedSections.map((course, index) => (
              <tr
                key={course._id}
                className="bg-white border-b hover:bg-gray-50"
              >
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
                <td className="py-4 px-6">0</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
