import React, { useState, useReducer } from 'react';
import { contact } from '../http';
import { useNavigate } from 'react-router-dom'
import LoadingCard from '../components/shared/LoadingCard'


const Contact = () => {

    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)


    function reducer(state, action) {
        switch (action.type) {
            case 'setSuccess':
                state = {
                    ...state,
                    flash: true,
                    fType: 'success',
                    fData: action.payload
                }
                return state;

            case 'setError':
                state = {
                    ...state,
                    flash: true,
                    fType: 'error',
                    fData: action.payload
                }
                return state
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, { flash: false, fType: '', fData: '' })

    async function sendMessage() {
        setLoading(true)
        try {
            const { data } = await contact({ message });
            dispatch({ type: 'setSuccess', payload: data.message })
            setLoading(false)

            setTimeout(() => {
                navigate('/')
            }, 1500);

        } catch (error) {
            console.log(error.response.data);
            dispatch({ type: 'setError', payload: error.response.data.err })
            setLoading(false)
        }
    }

    return (
        <>
            {
                loading ? <LoadingCard text="Till we're registering your request" /> :
                    <div className='container mx-auto mt-12 sm:mt-0'>
                        <h2
                            className='font-bold text-center mt-8 mb-4 text-lg'>
                            Contact/Suggest/Inquire
                        </h2>

                        {
                            state.flash ?
                                state.fType === 'success' ?
                                    <h2 className='mt-4 text-lg text-green-500 text-center font-semibold'>{state.fData}</h2>
                                    :
                                    state.fType === 'error' ?
                                        <h2 className='mt-4 text-lg text-red-500 text-center font-semibold'>{state.fData}</h2>
                                        : <></> : <></>
                        }

                        <div className='flex-center flex-col w-full'>
                            <p className='mt-10 mb-4 font-semibold'>Message for us...</p>
                            <textarea
                                name="message"
                                cols="30"
                                rows="10"
                                placeholder='Leave a message for us...'
                                className='rounded-sm h-40 py-2 px-4 w-5/6 sm:w-1/2'
                                style={{ background: '#F3F3F3', boxShadow: '3px 3px 12px rgba(0, 0, 0, 0.25)' }}
                                value={message}
                                onChange={(e) => { setMessage(e.target.value) }}
                            ></textarea>

                            <button
                                style={{ width: '15rem' }}
                                className="h-12 font-semibold mt-10 bg-black text-white"
                                onClick={sendMessage}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
            }
        </>
    );
};

export default Contact;
