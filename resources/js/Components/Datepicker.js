import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Datepicker = ({name, handleChange }) => {

    const [startDate, setStartDate] = useState(new Date());

    return (
        <DatePicker
            name={name}
            className=' mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm '
            onChange={(e) => {handleChange(e);  setStartDate(e) }}
            selected={startDate}

        />
    )
}

export default Datepicker
