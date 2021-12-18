import React, { useState } from 'react'
import DatePicker from "react-multi-date-picker";

import "react-datepicker/dist/react-datepicker.css";
const Datepicker = ({name, handleChange,selected }) => {

    const [startDate, setStartDate] = useState(selected);

    return (
        <DatePicker
            name={name}
            onChange={(e) => {handleChange(e);  setStartDate(e) }}
            value={startDate}
            format="DD-MM-YYYY"
            inputClass={' mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm '}
            containerClassName={' mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm '}

        />
    )
}

export default Datepicker
