import Authenticated from '@/Layouts/Authenticated'
import React, { useEffect, useState } from 'react'
import { Head, InertiaLink, useForm } from '@inertiajs/inertia-react'
import Button from '@/Components/Button'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import Datepicker from '@/Components/Datepicker'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Add = (props) => {
    // console.log(props);
    // Init form

    const { data, errors, setData, post } = useForm({
        taskGroupId: props.taskGroup.id,
        task: '',
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        explanation: '',
        deadline: '',
        date_of_assign: '',
        created_by: props.auth.user.name,
    });

    // Change form value change handler

    const onHandleChange = (e) => {

        setData(e.target.name, e.target.value);

    }

    // Submit form

    const submit = (e) => {

        e.preventDefault();

        post(route('task.store'), {
            preserveScroll: true,
            onError: (e) => console.log(e),
            onSuccess: () => {

                // reset();

                toast.success('Task Added!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored'
                });

                // document.getElementById('textAreaAzab').value = ""; //there was no other way :(


            }
        });

    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Task "<span className='font-bold'>{props.taskGroup.name}</span>"</h2>}
        >
            <Head title="Task Add" />

            <ToastContainer />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-lg">
                        <div className="bg-indigo-700 text-white p-6 border-b border-gray-200">
                            <label htmlFor="">Add Task</label>

                        </div>

                    </div>
                </div>


                <div className="max-w-7xl mb-2 mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-lg">
                        <div className="bg-white p-6 border-b border-gray-200">
                            <form onSubmit={submit}>
                                <div>
                                    <Label forInput="task" value="Task" />

                                    <Input
                                        type="text"
                                        name="task"
                                        value={data.task}
                                        className="mt-1 block w-full"
                                        autoComplete="task"
                                        handleChange={onHandleChange}

                                    />
                                    <span className='text-red-500'>{errors.task}</span>
                                </div>

                                <div className='mt-4'>
                                    <Label forInput="explanation" value="Explanation" />
                                    <textarea
                                        className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm resize rounded-md mt-1 block w-full"
                                        type="text"
                                        name="explanation"
                                        defaultValue={data.explanation}
                                        id='textAreaAzab'
                                        autoComplete="task"
                                        onChange={onHandleChange}
                                    />
                                    <span className='text-red-500'>{errors.explanation}</span>
                                </div>
                                <div className="mt-4">
                                    <Label forInput="color" value="Color" />
                                    <Input
                                        type='color'
                                        name="color"
                                        className="mt-1 block w-full px-3 my-2 rounded transition focus:border-blue-600 focus:outline-none"
                                        value={data.color}
                                        handleChange={onHandleChange}
                                    />
                                    <span className='text-red-500'>{errors.color}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">

                                    <div className='mt-4'>
                                        <Label forInput="assign_date" value="Assign Date" />
                                        <Datepicker
                                            name='date_of_assign'
                                            selected={""}
                                            handleChange={(date) => setData('date_of_assign', date?.format?.('DD-MM-YYYY'))}

                                        />
                                        <span className='text-red-500'>{errors.date_of_assign}</span>
                                    </div>
                                    <div className='mt-4'>
                                        <Label forInput="workEnd" value="DeadLine" />
                                        <Datepicker
                                            name='deadline'
                                            selected={""}
                                            handleChange={(endDate) => setData('deadline', endDate?.format?.("DD-MM-YYYY"))}

                                        />
                                        <span className='text-red-500'>{errors.deadline}</span>
                                    </div>


                                </div>

                                <div className="flex items-center justify-end mt-4">


                                    <Button className="ml-4" >
                                        Add Task
                                    </Button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </Authenticated>
    )
}

export default Add
