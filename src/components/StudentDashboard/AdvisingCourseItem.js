import React from 'react'
import { useGetCourseQuery } from '../../features/courses/coursesApi'

export default function AdvisingCourseItem({ advisingCourseId }) {
    const { data: course } = useGetCourseQuery(advisingCourseId)

    console.log(course)
    return (
        <li
            className="flex gap-4 py-2 px-4 w-full font-medium text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
            <span>
                {course?.code}
            </span>
            <span>
                {course?.title}
            </span>
        </li>
    )
}
