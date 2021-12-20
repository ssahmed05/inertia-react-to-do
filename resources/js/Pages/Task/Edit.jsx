import Authenticated from '@/Layouts/Authenticated'
import React, { useEffect, useState } from 'react'
import { Head, InertiaLink, useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import Button from '@/Components/Button'
import Pagination from "react-js-pagination"
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import Datepicker from '@/Components/Datepicker'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = (props) => {

    const { task } = props;


    const { data, errors, setData, post } = useForm({
        task: task.task,
        taskGroupId: task.task_group_id,
        explanation: task.explaination,
        deadline: task.deadline,
        date_of_assign: task.date_of_assign,
    });


    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    }
    const submit = (e) => {
        e.preventDefault();
        post(route('task.update', task.id), {
            preserveScroll: true,
            onError: (e) => {
                console.log(e);
            },
            onSuccess: (e) => {

                toast.success('Task Updated!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored'
                });
            }
        });
    }
    useEffect(() => {

        return () => {
            setData(false) ;
        }
    },[])


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Task "<span className='font-bold'>{task.task}</span>"</h2>}
        >
            <Head title="Task Edit" />
            <ToastContainer/>
            <div className="py-12">
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
                                <div className="grid grid-cols-2 gap-4">

                                    <div className='mt-4'>
                                        <Label forInput="assign_date" value="Assign Date" />
                                        <Datepicker
                                            name='date_of_assign'
                                            selected={new Date(task.date_of_assign)}
                                            handleChange={(date) => setData('date_of_assign', date?.format?.('DD-MM-YYYY'))}

                                        />
                                        <span className='text-red-500'>{errors.date_of_assign}</span>
                                    </div>
                                    <div className='mt-4'>
                                        <Label forInput="workEnd" value="DeadLine" />
                                        <Datepicker
                                            name='deadline'
                                            selected={new Date(task.deadline)}
                                            handleChange={(endDate) => setData('deadline', endDate?.format?.("DD-MM-YYYY"))}

                                        />
                                        <span className='text-red-500'>{errors.deadline}</span>
                                    </div>


                                </div>

                                <div className="flex items-center justify-end mt-4">


                                    <Button className="ml-4" >
                                        Update
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

export default Edit
