import React, { useState } from 'react';
import { createEmailContact } from '../../http';
import Section from '../shared/Section';

const EmailList = () => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [saveStatus, setSaveStatus] = useState({
        status: false,
        type: '',
        message: ''
    });

    async function handleSubmit() {
        setLoading(true)
        try {
            const { data } = await createEmailContact({ email })
            setLoading(false)
            setSaveStatus({
                status: true,
                type: 'success',
                message: data.message
            })
            setEmail('')

        } catch (error) {
            console.log(error);
            setLoading(false)
            setSaveStatus({
                status: true,
                type: 'error',
                message: error.response.data.err
            })
        }
    }

    return (
        <div className='mt-12'>
            <Section
                title='Subscribe to Our Newsletter'>
                <p
                    className='text-center text-gray-500 mt-6 mb-6 sm:mb-8 sm:mt-8'>
                    We'll keep you updated so you never miss a deal!
                </p>

                {
                    saveStatus.status === true ?
                        saveStatus.type === 'success' ?
                            <h2 className='text-center my-2 font-semibold text-green-500'>{saveStatus.message}</h2>
                            :
                            saveStatus.type === 'error' ?
                                <h2 className='text-center my-2 font-semibold text-red-500'>{saveStatus.message}</h2>
                                : <></> : <></>
                }

                <div className='sm:flex sm:items-center sm:justify-center block w-full mb-12 px-2'>
                    <span className='mr-6 '>Email</span>
                    <input
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        style={{ border: '1px solid black' }}
                        className='px-4 w-11/12 h-10 my-2'
                        placeholder='Drop your email here!'
                    ></input>
                    <button
                        disabled={loading ? true : false}
                        onClick={handleSubmit}
                        className='bg-black rounded-sm text-white font-bold sm:ml-6 w-48 h-12'>
                        {
                            loading ?
                                <div className={`spinner block mx-auto w-6 h-6 rounded-full`}></div>
                                :
                                <>Subscribe</>
                        }
                    </button>
                </div>
            </Section>
        </div>
    );
};

export default EmailList;
