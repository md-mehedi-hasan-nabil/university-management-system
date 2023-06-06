import React from 'react'
import Layout from '../components/AdminDashboard/Layout'

export default function AdminDepartment() {
  return (
    <Layout>
      <div className='p-8'>
        <div className='w-full md:w-1/2'>
          <form >
            <div className="mb-6">
              <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter department name</label>
              <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Department name" required />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
          </form>
        </div>

        <div>
          list of department
        </div>
      </div>
    </Layout>
  )
}
