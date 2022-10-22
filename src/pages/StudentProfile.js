import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Profile from '../components/StudentDashboard/Profile';

export default function StudentProfile() {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  useEffect(() => {
    document.title = 'Profile Page';
  }, []);

  return (
    <main className="flex bg-gray-100 min-h-screen">
      <div className="container flex justify-center items-end bg-[url('https://api.lorem.space/image/furniture')] bg-no-repeat bg-center bg-cover">
        <div
          className="bg-white w-3/4 h-3/4 rounded-t-[1rem] p-2"
          style={{ boxShadow: 'rgb(51 51 51 / 60%) 0px 0px 4px 500px;' }}
        >
          <>
            <img
              className="w-40 h-40 mx-auto shadow-lg -mt-20 object-cover rounded-full overflow-hidden"
              src={auth?.user?.imageUrl}
              alt="profile"
            />
          </>
          <Profile />
        </div>
      </div>
    </main>
  );
}
