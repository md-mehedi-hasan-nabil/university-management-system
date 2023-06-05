import React from 'react'

export default function AddNewStudent() {

    return (
        <>
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add New Student</h3>
            <form className="space-y-6 pb-4" action="#">
                <div>
                    <label for="student_name" className="block mb-2 text-sm font-medium text-gray-900">Student Name</label>
                    <input type="text" name="student_name" id="student_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter name" required />
                </div>
                <div>
                    <label for="student_id" className="block mb-2 text-sm font-medium text-gray-900">Student ID</label>
                    <input type="text" name="student_id" id="student_id" placeholder="Student ID" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div>
                    <label for="department" className="block mb-2 text-sm font-medium text-gray-900">Department</label>
                    <select id="department" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>France</option>
                        <option>Germany</option>
                    </select>
                </div>

                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
            </form>
        </>
    )
}
