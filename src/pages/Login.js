import React, { useEffect, useState } from 'react';
import logo from '../assets/seu_logo.png';
import bgImage from '../assets/bg-pattern.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Error from '../components/ui/Error';
import { useLoginMutation } from '../features/auth/authApi';
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [login, { isLoading, isSuccess, data, isError, error: responseError }] =
    useLoginMutation();

  useEffect(() => {
    document.title = 'Login Page';
    if (data?.accessToken && data?.user) {
      navigate('/dashboard');
    }
    if (isSuccess) {
      if (data?.error?.message) {
        setError(data?.error?.message);
      }
      if (data?.accessToken) {
        setEmail('');
        setPassword('');
        toast.success('Login successfull');
      }
      console.log(data);
    }
    if (isError) {
      setError(responseError?.data?.error?.message);
    }
  }, [isSuccess, data, isError, responseError?.data, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      login({
        email,
        password,
      });
    }
  }

  return (
    <div
      className="flex justify-center items-center h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div>
        <form
          onSubmit={handleSubmit}
          style={{ boxShadow: 'rgb(51 51 51 / 60%) 0px 0px 0px 1000px' }}
          className="animate-zoomIn w-96 mx-auto bg-purple-100/80 py-4 px-6 rounded-xl shadow-2xl ring-2 backdrop-filter backdrop-blur-xl"
        >
          <img className="w-24 mx-auto -mt-12" src={logo} alt="seu_logo" />
          <h2 className="mb-6 mt-4 text-3xl font-bold text-center">
            Login to Account
          </h2>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div>
            {error && <Error message={error} />}
            <p className="mb-4 text-sm">
              Don’t have an account?{' '}
              <Link to="/register">
                <span className="hover:underline text-red-500">
                  Create an account
                </span>
              </Link>
            </p>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="text-white bg-purple-700 disabled:cursor-not-allowed hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
