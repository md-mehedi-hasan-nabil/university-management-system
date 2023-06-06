import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useGetDepartmentsQuery } from '../../features/department/departmentApi';
import { toast } from 'react-toastify';
import { useAddStudentMutation } from '../../features/student/studentApi';

export default function AddNewStudent() {
    const { isSuccess: isSuccessDepartments, data: departments } = useGetDepartmentsQuery()
    const { register, handleSubmit } = useForm();
    const [addStudent, { isSuccess: isSuccessAddStudent, data: addStudentResponse, error: addStudentError, isError: isAddStudentError }] = useAddStudentMutation()

    useEffect(() => {
        if (isSuccessAddStudent) {
            toast.success(addStudentResponse?.message ? addStudentResponse?.message : "Student added.")
        }
        if (isAddStudentError) {
            toast.error(addStudentError?.data?.error?.message ? addStudentError?.data?.error?.message : "Something is wrong.")
        }
    }, [isSuccessAddStudent, addStudentResponse, isAddStudentError, addStudentError])


    const onSubmit = data => {
        console.log("addStudent(data)")
        addStudent(data)
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-96 mx-auto">
                <h2 className="mb-6 mt-4 text-3xl font-bold text-center ">
                    Add New Student
                </h2>
                <div className="relative z-0 mb-6 w-full group">
                    <input
                        type="email"
                        name="email"
                        id="floating_email"
                        {...register("email")}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email address
                    </label>
                </div>

                <div className="relative z-0 mb-6 w-full group">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        {...register("username")}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="username"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Name
                    </label>
                </div>

                <div className="relative z-0 mb-6 w-full group">
                    <input
                        type="url"
                        name="imageUrl"
                        id="imageUrl"
                        {...register("imageUrl")}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="imageUrl"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Image url
                    </label>
                </div>


                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 mb-6 w-full group">
                        <input
                            type="tel"
                            name="phone"
                            id="floating_phone"
                            {...register("phone")}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_phone"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Phone number
                        </label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input
                            type="text"
                            name="address"
                            id="floating_address"

                            {...register("address")}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_address"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Address
                        </label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 mb-6 w-full group">
                        <input
                            type="date"
                            name="birthday"
                            id="floating_birthday"

                            {...register("birthday")}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_birthday"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Birthday
                        </label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input
                            type="text"
                            name="gender"
                            id="floating_gender"

                            {...register("gender")}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_gender"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Gender
                        </label>
                    </div>
                </div>

                <div className='mb-4'>
                    <label for="department" className="block mb-2 text-sm text-gray-500">Department</label>
                    <select id="department" className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        {
                            (isSuccessDepartments && departments?.length > 0) ? departments?.map(department => <option value={department._id}>{department.name}</option>) : <option>No department found</option>
                        }
                    </select>
                </div>

                <button
                    // disabled={isLoading}
                    type="submit"
                    className="text-white bg-blue-700 disabled:cursor-not-allowed hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
                >
                    {/* {isLoading ? 'Loading...' : 'Submit'} */}
                    Add Student
                </button>
            </form>

        </>
    )
}
