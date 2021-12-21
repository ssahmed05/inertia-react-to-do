import Authenticated from '@/Layouts/Authenticated'
import React, { useEffect, useState } from 'react'
import { Head, InertiaLink, useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import Button from '@/Components/Button'
import Pagination from "react-js-pagination"
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import Datepicker from '@/Components/Datepicker'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const List = (props) => {

    const { taskGroup } = props;

    const [kaam, setKaam] = useState({
        taskList: "",
    })

    const fetchData = async (pageNumber = 1) => {

        const api = await fetch(`/Task-List/${props.id}?page=${pageNumber}`);
        setKaam({
            taskList: await api.json()
        });
    }

    // Add Task

    const initState = {
        taskGroupId: taskGroup.id,
        task: '',
        explanation: '',
        deadline: '',
        date_of_assign: '',
        created_by: props.auth.user.name,
    }

    const { data, errors, setData, reset, post } = useForm(initState);

    const [show, setShow] = useState(Object.keys(errors).length == 0 ? false : true);
    const visibleHandle = () => show == false ? setShow(true) : setShow(false);
    const onHandleChange = (e) => {

        setData(e.target.name, e.target.value);

    }


    const submit = (e) => {
        e.preventDefault();

        post(route('task.store'), {

            preserveScroll: true,
            onError: (e) => {
                console.log(e);
            },

            onSuccess: () => {

                reset();

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
                document.getElementById('textAreaAzab').value = ""; //there was no other way :(
                fetchData();
            }

        });


    }

    // Delete Task
    function deleteTask(id) {

        Inertia.delete(route('task.delete', id), {
            preserveScroll: true,

            onError: (e) => {
                console.log(e);
            },
            onSuccess: (res) => {

                toast.error('Task Deleted', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored'
                });
                fetchData();

            }

        });
    }
    useEffect(() => {
        fetchData();
        return () => {
            setKaam.current = false;
            setShow.current = false;
            setData.current = false;


        }

    })

    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Task(s) for <span className='font-bold'>{taskGroup.name}</span></h2>}
        >
            <Head title="Task" />
            {/* Alert */}
            <ToastContainer />
            {/* Alert End */}
            <div className="py-12">


                {/* Add Task */}

                {show ?
                    <>
                        {

                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow-lg">
                                    <div className="bg-indigo-700 text-white p-6 border-b border-gray-200">
                                        <label htmlFor="">Add Task</label>

                                    </div>

                                </div>
                            </div>

                        }

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
                                                    selected={new Date()}
                                                    handleChange={(date) => setData('date_of_assign', date?.format?.('DD-MM-YYYY'))}

                                                />
                                                <span className='text-red-500'>{errors.date_of_assign}</span>
                                            </div>
                                            <div className='mt-4'>
                                                <Label forInput="workEnd" value="DeadLine" />
                                                <Datepicker
                                                    name='deadline'
                                                    selected={new Date()}
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
                    </>
                    : null}

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="bg-indigo-700 text-white p-6 border-b border-gray-200">
                            <label htmlFor="">List Of Task</label>
                            <button onClick={visibleHandle} className='float-right inline-flex items-center px-4 py-2 bg-indigo-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150' style={{ marginTop: "-5px" }}>Add</button>
                        </div>

                    </div>
                </div>
                <div className="mt-4 max-w-7xl  mx-auto sm:px-6 lg:px-8">

                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-indigo-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-indigo-200 border-collapse ">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-300 tracking-wider">
                                                    Task
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-300 tracking-wider">
                                                    Explanation
                                                </th>

                                                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-300 tracking-wider">
                                                    Progress
                                                </th> */}
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercas border border-gray-300 tracking-wider">
                                                    Date
                                                </th>

                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border border-gray-300 tracking-wider">
                                                    Progress
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 text-right uppercase border border-gray-300 tracking-wider">
                                                    Action
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-indigo-200">
                                            {

                                                kaam.taskList.data == "" ?
                                                    (
                                                        <tr>
                                                            <td colSpan={7} className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex justify-center">

                                                                    <div className="ml-4">
                                                                        <div className="text-md font-medium text-red-900">
                                                                            <p>No Record Found</p>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </td>

                                                        </tr>

                                                    ) :
                                                    kaam?.taskList?.data ?
                                                        kaam.taskList.data.map((record) => {

                                                            return (

                                                                <tr key={record.id} className=' bg-white-50  hover:bg-indigo-50 '>
                                                                    <td className="px-6 py-4">
                                                                        <div className="flex items-center">

                                                                            <div className="ml-4">
                                                                                <div className="text-sm font-medium text-gray-900">
                                                                                    {record.task}
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        <div className="text-sm text-gray-900"> {record.explaination}</div>
                                                                    </td>

                                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                                        <div className="basis-full">
                                                                            <label className='font-bold' htmlFor="">Start Date : </label> <span>{new Date(record.date_of_assign).toLocaleDateString()}</span>
                                                                        </div>
                                                                        <div className="basis-full">
                                                                            <label className='font-bold' htmlFor="">Deadline : </label> <span>{new Date(record.deadline).toLocaleDateString()}</span>

                                                                        </div>
                                                                        <div className="basis-full">
                                                                            <label className='font-bold' htmlFor="">Status : </label> <span>
                                                                                {record.date_of_complete == null ?

                                                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                                        {record.status}
                                                                                    </span>
                                                                                    :
                                                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                                        {record.status + " (" + new Date(record.date_of_complete).toLocaleDateString() + " )"}
                                                                                    </span>
                                                                                }
                                                                            </span>

                                                                        </div>
                                                                    </td>
                                                                    <td className=''>
                                                                        {/* <input
                                                                            type="range"
                                                                            min="0"
                                                                            max="100"
                                                                            step={1}
                                                                            defaultValue={0}
                                                                            className='w-full h-0.5 bg-gray-400 rounded outline-none slider-thumb' name="slider"
                                                                            onChange={(r) => console.log(r)}
                                                                        /> */}
                                                                        <span className="text-lg font-semibold inline-block align-middle py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200 uppercase text-center">
                                                                           indigo
                                                                        </span>

                                                                    </td>

                                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                        <InertiaLink href={route('task.edit', record.id)} className="font-bold text-indigo-400 hover:text-indigo-900">Edit</InertiaLink> &nbsp;
                                                                        <a href="#" onClick={() => { deleteTask(record.id) }} className="font-bold text-red-400 hover:text-red-700">Delete</a>
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

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-lg bg-white sm:rounded-lg ">
                        <div className="flex justify-center mb-4">

                            <Pagination
                                activePage={kaam?.taskList?.current_page ? kaam?.taskList?.current_page : 0}
                                itemsCountPerPage={kaam?.taskList?.per_page ? kaam?.taskList?.per_page : 0}
                                totalItemsCount={kaam?.taskList?.total ? kaam?.taskList?.total : 0}
                                onChange={(pageNumber) => {
                                    fetchData(pageNumber)
                                }}
                                pageRangeDisplayed={6}
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

                {/* Task List End */}


            </div>



        </Authenticated>

    )
}

export default List
