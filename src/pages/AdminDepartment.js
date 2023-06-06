import React, { useEffect } from 'react'
import Layout from '../components/AdminDashboard/Layout'
import { useForm } from 'react-hook-form';
import { useAddDepartmentMutation, useGetDepartmentsQuery } from '../features/department/departmentApi';
import { toast } from 'react-toastify';

export default function AdminDepartment() {
  const [addDepartment, { isSuccess: isSuccessAddDepartment, data }] = useAddDepartmentMutation()
  const { data: departments, isSuccess: isSuccessDepartments, refetch: refetchDepartments } = useGetDepartmentsQuery()

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (isSuccessAddDepartment) {
      refetchDepartments()
      toast.success(data?.message ? data?.message : "Department add successfully")
    }
  }, [isSuccessAddDepartment, data, refetchDepartments])

  const onSubmit = data => {
    console.log(data)
    addDepartment(data)
  };
  return (
    <Layout>
      <div className='p-8'>
        <div className='w-full md:w-1/2'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter department name</label>
              <input {...register("name")} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Computer Science Engineering" required />
            </div>
            <div className="mb-6">
              <label for="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter code</label>
              <input {...register("code")} type="text" id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="CSE" required />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
          </form>
        </div>

        <div className='mt-8 grid grid-cols-12 gap-6'>
          {
            (isSuccessDepartments && departments?.length > 0) ? departments?.map(department => <div className='col-span-12 md:col-span-6 border rounded-md py-8 cursor-pointer hover:bg-slate-200'>
              <h3 className='font-semibold text-3xl text-center'>{department.name}</h3>
              <p className='text-center text-xl'>{department.code}</p>
            </div>) : <h3 className='col-span-6 font-medium text-lg'>No department found</h3>
          }
        </div>
      </div>
    </Layout>
  )
}
