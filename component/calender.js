import React, { useState } from 'react';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
export default function App() {
    const [selectedDay, setSelectedDay] = useState('');
    const handleDayClick = (date) => {
        console.log(date)
        setSelectedDay(date)
    };

    const footer = selectedDay ? (
        <p>You selected {selectedDay.toDateString()}.</p>
    ) : (
        <p>Please pick a day.</p>
    );

    return (
        <div className='bg-blue-500'>
            <h1 className='btn border-t-black'>this is hea</h1>
            <DayPicker
                selected={selectedDay}
                onDayClick={handleDayClick}
                footer={footer}
            />
        </div>
    );
}
