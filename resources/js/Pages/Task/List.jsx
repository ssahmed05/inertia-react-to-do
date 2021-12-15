import Authenticated from '@/Layouts/Authenticated'
import React, { useEffect, useState } from 'react'
import { Head, InertiaLink, useForm } from '@inertiajs/inertia-react'
import Button from '@/Components/Button'
import Pagination from "react-js-pagination"
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import Datepicker from '@/Components/Datepicker'
import { Inertia } from '@inertiajs/inertia'


const List = (props) => {

    const { taskGroup, errors } = props;
    const [alert, setAlert] = useState(props.flash.message != null ? true : false);
    const [kaam, setKaam] = useState({
        taskList: "",
    })
    const fetchData = async (pageNumber = 1) => {

        const api = await fetch(`/Task-List/${props.id}?page=${pageNumber}`);
        // const api = await fetch(`/Task-Group-List?page=${pageNumber}`);

        setKaam({
            taskList: await api.json()
        });
    };

    // Add Task
    const { data, setData, processing } = useForm({
        taskGroupId: taskGroup.id,
        task: '',
        explanation: '',
        status: '',
        date_of_assign: new Date().toLocaleDateString(),
        deadline: new Date().toLocaleDateString(),
        created_by: props.auth.user.name,

    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    }
    const submit = (e) => {
        e.preventDefault();
        Inertia.visit(route('task.store'), {
            method: 'post',
            data: data,
        });
    }

    useEffect(() => {
        fetchData();

    }, [])
    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Task(s) for <span className='font-bold'>{taskGroup.name}</span></h2>}
        >
            <Head title="Task" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {
                        alert ? (
                            <div id="alert-border-1" className="flex bg-green-100 dark:bg-green-200 border-t-4 border-green-500 p-4 mb-5" role="alert">
                                <svg className="w-5 h-5 flex-shrink-0 text-green-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                                <div className="ml-3 text-sm font-medium text-green-700">
                                    {props.flash.message}
                                </div>
                                <button type="button" onClick={() => setAlert(false)} className="ml-auto -mx-1.5 -my-1.5 bg-green-100 dark:bg-green-200 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 dark:hover:bg-green-300 inline-flex h-8 w-8" data-collapse-toggle="alert-border-1" aria-label="Close">
                                    <span className="sr-only">Dismiss</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                            </div>
                        ) : null
                    }
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-lg">
                        <div className="bg-indigo-700 text-white p-6 border-b border-gray-200">
                            <label htmlFor="">Add Task</label>
                        </div>

                    </div>
                </div>
                <div className="max-w-7xl mb-10 mx-auto sm:px-6 lg:px-8">
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
                                        autoComplete="task"
                                        onChange={onHandleChange}
                                    >
                                    </textarea>
                                    <span className='text-red-500'>{errors.explanation}</span>
                                </div>
                                <div className='mt-4'>
                                    <Label forInput="status" value="Status (Progress)" />

                                    <Input
                                        type="text"
                                        name="status"
                                        value={data.status}
                                        className="mt-1 block w-full"
                                        autoComplete="status"
                                        handleChange={onHandleChange}

                                    />
                                    <span className='text-red-500'>{errors.task}</span>
                                </div>
                                <div className='mt-4'>
                                    <Label forInput="assign_date" value="Assign Date" />
                                    <Datepicker
                                        name='date_of_assign'
                                        handleChange={(date) => setData('date_of_assign', date.toLocaleDateString())}
                                    />
                                    <span className='text-red-500'>{errors.date_of_assign}</span>
                                </div>
                                <div className='mt-4'>
                                    <Label forInput="deadline" value="Deadline" />
                                    <Datepicker
                                        name='deadline'
                                        handleChange={(date) => setData('deadline', date.toLocaleDateString())}
                                    />
                                    <span className='text-red-500'>{errors.date_of_assign}</span>
                                </div>

                                <div className="flex items-center justify-end mt-4">


                                    <Button className="ml-4" processing={processing}>
                                        Add Task
                                    </Button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="bg-indigo-700 text-white p-6 border-b border-gray-200">
                            <label htmlFor="">List Of Task</label>
                        </div>

                    </div>
                </div>
                <div className="mt-4 max-w-7xl mb-10 mx-auto sm:px-6 lg:px-8">

                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-400">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-300 tracking-wider">
                                                    Task
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-300 tracking-wider">
                                                    Explanation
                                                </th>

                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-300 tracking-wider">
                                                    Progress
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercas border border-gray-300e tracking-wider">
                                                    Date Of Assign
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-300 tracking-wider">
                                                    Deadline
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-300 tracking-wider">
                                                    Date Of complete
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-300 tracking-wider">
                                                    Action
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {

                                                kaam.taskList.data == ""  ?
                                                    (
                                                        <tr>
                                                            <td colSpan={7} className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex justify-center">

                                                                    <div className="ml-4">
                                                                        <div className="text-md font-medium text-red-900">
                                                                            <p>No Record</p>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </td>

                                                        </tr>

                                                    ) :
                                                    kaam?.taskList?.data?
                                                        kaam.taskList.data.map((record) => {

                                                        return (
                                                                <tr key={record.id}>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">

                                                                            <div className="ml-4">
                                                                                <div className="text-sm font-medium text-gray-900">
                                                                                    {record.task}
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="text-sm text-gray-900"> {record.explaination}</div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                            {record.status}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                            { new Date(record.date_of_assign).toLocaleDateString() }
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                            { new Date(record.deadline).toLocaleDateString() }
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                            {record.date_of_complete == null ? "Not Completed" :  new Date(record.date_of_complete).toLocaleDateString()}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                        <a href="#" className="text-indigo-400 hover:text-indigo-900">Edit</a>
                                                                    </td>
                                                                </tr>

                                                        )
                                                    }) : (
                                                        <tr>
                                                            <td colSpan={7} className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">

                                                                    <div className="ml-4">
                                                                        <div className="text-sm font-medium text-gray-900">
                                                                            Loading Please Wait...
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </td>

                                                        </tr>

                                                    )
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {
                    kaam.taskList?.data ?
                        kaam.taskList.data.map((record) => {
                            return (
                                <div key={record.id} className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                    <div className="bg-white p-6 mt-5 border-b-4 shadow-sm" style={{ borderBottom: "3", borderColor: record.color }}>
                                        <div className="flex justify-between">
                                            <label className='m-3 text-md'>{record.name}</label>
                                            <Button className='bg-indigo-500'>Open</Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) :
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white p-6 mt-5 border-b-4 shadow-sm">
                                <div className="flex justify-between">
                                    Loading.. Please wait!
                                </div>
                            </div>
                        </div>
                } */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-lg sm:rounded-lg ">
                        <div className="flex justify-center mt-2">

                            <Pagination
                                activePage={kaam?.taskList?.current_page ? kaam?.taskList?.current_page : 0}
                                itemsCountPerPage={kaam?.taskList?.per_page ? kaam?.taskList?.per_page : 0}
                                totalItemsCount={kaam?.taskList?.total ? kaam?.taskList?.total : 0}
                                onChange={(pageNumber) => {
                                    fetchData(pageNumber)
                                }}
                                pageRangeDisplayed={8}
                                itemClass="py-4"
                                innerClass="relative z-0 inline-flex rounded-full shadow-sm -space-x-px"
                                activeClass='indigo-500'
                                activeLinkClass="indigo-500"
                                linkClass=" px-4 py-2 mx-1  bg-indigo-500 text-sm font-medium text-white hover:bg-indigo-300 rounded-full"
                                firstPageText="First"
                                lastPageText="Last"
                            />
                        </div>
                    </div>
                </div>

            </div>



        </Authenticated>

    )
}

export default List
