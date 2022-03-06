import React, { useState } from 'react';
import DatePicker from 'react-date-picker'

const DOB = ({ storeInfo, user }) => {

    const [bd, setBd] = useState({
        bDate: '',
        bMonth: '',
        bYear: '',
    })

    function handleDate({ date, month, year }) {
        setBd({
            bDate: date,
            bMonth: month,
            bYear: year,
        })
        storeInfo('birthday', `${date}-${month + 1}-${year}`)
    }
    return (
        <>
            <div className='pt-6 w-max h-max block mx-auto'>
                <label
                    className='flex items-center'
                    htmlFor="dob">
                    Birthday <span className='text-red-500'>*</span>
                </label>
                <DatePicker
                    onChange={(e) => {
                        handleDate({
                            date: e.getDate(),
                            month: e.getMonth(),
                            year: e.getFullYear(),
                        })
                    }} />

                {
                    bd.bDate !== "" ?
                        <div className='flex mx-auto w-max h-max mt-4 text-purple-800'>
                            <span className="font-semibold">Selected Date: </span>
                            <span className='font-bold ml-2'>{`${bd.bDate}-${bd.bMonth + 1}-${bd.bYear}`}</span>
                        </div>
                        :
                        <></>
                }
            </div>
        </>
    );
};

export default DOB;
