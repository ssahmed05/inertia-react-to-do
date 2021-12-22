import Authenticated from '@/Layouts/Authenticated'
import React, { useEffect, useState } from 'react'
import { Head, InertiaLink, useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import Pagination from "react-js-pagination"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '@/Components/Modal'

const List = (props) => {

    const [kaam, setKaam] = useState({
        taskList: false,
    })

    const fetchData = async (pageNumber = 1) => {
        const api = await fetch(`/Task-List/${props.id}?page=${pageNumber}`);
        setKaam({
            taskList: await api.json()
        });

    }

    const [showModel, setShowModel] = useState({ id: 0 });
    const handleShowModal = (e) => {
        setShowModel({
            id: [e.target.id]
        });
    }

    const [progressBar, setProgressBar] = useState({
        id : [],
        proVal: []
    });

    const onProgressHandler = (id, value) => {

        setProgressBar({
            id: [...progressBar.id, id],
            proVal: [...progressBar.value, value]
        });
        // useForm.post()
        console.log(progressBar);
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
            }

        });
    }

    useEffect(() => {

        let letMyDataLoad = true;

        if (letMyDataLoad) {

            fetchData();
        }

        return () => {
            setKaam.current = false;
            setShowModel.current = false;
            letMyDataLoad = false;
        }

    })

    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Task(s) for <span className='font-bold'>{props.taskGroup.name}</span></h2>}
        >
            <Head title="Task" />
            {/* Alert */}

            <ToastContainer />

            {/* Alert End */}
            <div className="py-12">


                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="bg-indigo-700 text-white p-6 border-b border-gray-200">
                            <label htmlFor="">List Of Task</label>
                            <InertiaLink href={route('task.add', props.taskGroup.id)}
                                className='float-right inline-flex items-center px-4 py-2 bg-indigo-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150' style={{ marginTop: "-5px" }}>
                                Add
                            </InertiaLink>
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
                                                                    <td className='px-6 py-4'>

                                                                        {record.status == "Pending" ?
                                                                            <>
                                                                                <button onClick={(e) => handleShowModal(e)} id={record.id} className={"bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded-full"}>
                                                                                    {record.status}
                                                                                </button>
                                                                                {showModel.id == record.id &&
                                                                                    <Modal show={showModel} onClose={setShowModel} title={"Set progress for Task : " + record.task} >
                                                                                        <input
                                                                                            id={record.id}
                                                                                            type="range"
                                                                                            min="0"
                                                                                            max="100"
                                                                                            step={1}
                                                                                            defaultValue={progressBar.id == record.id ? record.status : 0}
                                                                                            className='w-full h-0.5 bg-gray-400 rounded outline-none slider-thumb' name="slider"
                                                                                            onChange={(r) => onProgressHandler(r.target.id, r.target.value)}
                                                                                        />
                                                                                        <div className="text-center">

                                                                                            <span>{progressBar.id == record.id ? progressBar.proVal : "0"}%</span>

                                                                                        </div>
                                                                                    </Modal>
                                                                                }
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <button onClick={(e) => handleShowModal(e)} id={record.id} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded-full">
                                                                                    {record.status}
                                                                                </button>
                                                                                {showModel.id == record.id &&
                                                                                    <Modal show={showModel} onClose={setShowModel} title={"Set progress for Task" + record.task} >
                                                                                        <input
                                                                                            type="range"
                                                                                            min="0"
                                                                                            max="100"
                                                                                            step={1}
                                                                                            defaultValue={0}
                                                                                            className='w-full h-0.5 bg-gray-400 rounded outline-none slider-thumb' name="slider"
                                                                                            onChange={(r) => console.log(r)}
                                                                                        />
                                                                                    </Modal>
                                                                                }
                                                                            </>


                                                                        }

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
