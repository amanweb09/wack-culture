import React from 'react';
import { useSelector } from 'react-redux';

const LoginCard = () => {
    const { isAuth, user } = useSelector((state) => state.auth)

    return (
        <div
            style={{ width: '20rem', height: '5rem', borderRadius: 5, border: '1px solid #dcdcdc' }}
            className='loginInfo p-2 mt-4'>
            {
                isAuth ?
                    <>
                        <div className="flex font-semibold text-green-500">
                            <span className='mr-2'>&#10003;</span>
                            <span>Login</span>
                        </div>
                        <h2 style={{ textTransform: 'capitalize' }} className='mt-2 pl-4'>{user.name}</h2>
                    </>
                    :
                    <div className="flex font-semibold text-red-500">
                        <span className='mr-2'>&times;</span>
                        <span>Login</span>
                    </div>
            }

        </div>
    );
};

export default LoginCard;
