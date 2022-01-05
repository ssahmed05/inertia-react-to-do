import Authenticated from '@/Layouts/Authenticated'
import React, { useEffect, useState } from 'react'
import { Head, InertiaLink } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '@/Components/Modal'
import Checkbox from '@/Components/Checkbox'


const List = (props) => {

    const [showModel, setShowModel] = useState({ id: 0 });
    const handleShowModal = (e) => {
        setShowModel({
            id: [e.target.id]
        });
    }

    const [progressBar, setProgressBar] = useState({
        id: [],
        proVal: []
    });

    const onProgressHandler = (id, value) => {
        setProgressBar({
            id: id,
            proVal: value
        });

    }
    const progressSaveHandle = () => {

        Inertia.visit(route('task.setprogress'), {
            method: 'post',
            data: progressBar,
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setShowModel(false)

        });
    }
    // Delete Task
    function deleteTask(id) {

        Inertia.delete(route('task.delete', id), {
            preserveScroll: true,
            preserveState: true,

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
    const onHandleChange = (e) => {

        if(e.target.checked) {

            Inertia.post(route('task.setcomplete'), {
                id: e.target.name,
                doc: e.target.value
            }, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (res) => {

                    toast.success('Mark as Completed', {
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

        } else {

            Inertia.post(route('task.setcomplete'), {
                id: e.target.name,
                doc: null
            }, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (res) => {

                    toast.error('Removed From Completed', {
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
            console.log('not checked');

        }

    }

    useEffect(() => {

        return () => {
            setShowModel.current = false;
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

                <div className="max-w-7xl mt-10 mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-4 overflow-hidden sm:rounded-lg">

                        {
                            props.tasks == "" ? (

                                <div className=" p-10">
                                    <div className="max-w-sm bg-white rounded overflow-hidden shadow-lg">
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">No Data</div>
                                            <p className="text-gray-700 text-base">
                                                Click on Add (+) To add Data
                                            </p>
                                        </div>
                                        <div className="px-6 pt-4 pb-2">
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Please</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Add</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Any_Task</span>
                                        </div>
                                    </div>
                                </div>

                            ) :
                                props.tasks.map(record => {
                                    let applyCheck = record.date_of_complete != null ? true: false;
                                    return (
                                        <div
                                            key={record.id}
                                            className="
                                                    h-fit
                                                    mt-2
                                                    transition
                                                    transform
                                                    hover:-translate-y-1.5
                                                    motion-reduce:transition-none
                                                    motion-reduce:transform-none
                                                    p-2 shadow-lg
                                                    border-b-4
                                                    border-t-4
                                                    border
                                                    bg-white
                                                    "
                                            style={{
                                                borderColor: record.color,
                                                borderBottomColor: record.color
                                            }}
                                        >
                                            <div className="max-w-full flex flex-col h-fit justify-between rounded">
                                                <div className="px-6 py-4 ">
                                                    <div className="font-bold text-xl mb-2">
                                                        {record.task}
                                                        <a href="#" onClick={() => { deleteTask(record.id) }} className="float-right text-red-400 hover:text-red-600 uppercase text-xs">Delete</a>
                                                        <InertiaLink href={route('task.edit', record.id)} className="float-right text-indigo-400 hover:text-indigo-600 uppercase text-xs mr-2">Edit</InertiaLink>

                                                    </div>
                                                    <p className="text-gray-700 text-base overflow-auto hover:overflow-y-scroll h-32 journal-scroll" style={{ whiteSpace: "pre-line" }}>
                                                        {record.explaination}
                                                    </p>
                                                </div>
                                                <div className="px-6 pt-4 pb-2">

                                                    {record.status == "Pending" ?
                                                        <>
                                                            <button onClick={(e) => handleShowModal(e)} id={record.id} className={"bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded-full"}>
                                                                {record.status}
                                                            </button>
                                                            {showModel.id == record.id &&
                                                                <Modal show={showModel} onClose={setShowModel} title={"Progress for :" + record.task}
                                                                    //  style={{top:'-200px'}}
                                                                    className={'w-11/12 mx-auto'} >
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
                                                                    <div className="flex justify-end mt-5">

                                                                        <button
                                                                            className="bg-indigo-500 text-white hover:bg-indigo-400 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                                                                            type="button"
                                                                            onClick={progressSaveHandle}
                                                                        >
                                                                            Save Changes
                                                                        </button>

                                                                    </div>

                                                                </Modal>
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            <button onClick={(e) => handleShowModal(e)} id={record.id} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded-full">
                                                                {record.status}%
                                                            </button>
                                                            {showModel.id == record.id &&
                                                                <Modal show={showModel} onClose={setShowModel} title={'Progress for: "' + record.task + '"'}
                                                                    // style={{top:'-200px'}}
                                                                    className={'w-11/12 mx-auto'}
                                                                >
                                                                    <input
                                                                        id={record.id}
                                                                        type="range"
                                                                        min="0"
                                                                        max="100"
                                                                        step={1}
                                                                        defaultValue={record.status}
                                                                        className='w-full h-0.5 bg-gray-400 rounded outline-none slider-thumb' name="slider"
                                                                        onChange={(r) => onProgressHandler(r.target.id, r.target.value)}
                                                                    />
                                                                    <div className="text-center">
                                                                        <span>{progressBar.id == record.id ? progressBar.proVal : record.status}%</span>
                                                                    </div>
                                                                    <div className="flex justify-end mt-5">
                                                                        <button
                                                                            className="text-indigo-400 hover:text-indigo-600 uppercase text-xs mr-2"
                                                                            type="button"
                                                                            onClick={progressSaveHandle}
                                                                        >
                                                                            Save Changes
                                                                        </button>

                                                                    </div>

                                                                </Modal>
                                                            }
                                                        </>
                                                    }


                                                    {record.status == 100 ?
                                                        <div className="float-right mt-2.5">
                                                            <Checkbox
                                                                name={record.id}
                                                                value={new Date().toLocaleDateString()}
                                                                className="mt-1 block w-full"
                                                                autoComplete="task"
                                                                handleChange={onHandleChange}
                                                                id={"label" + record.id}
                                                                checked={applyCheck}
                                                            /> &nbsp;
                                                            <label htmlFor={"label" + record.id}>Mark As Complete</label>
                                                        </div>
                                                        : null}

                                                </div>
                                                <div className="px-6 pt-4 pb-2">
                                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Start Date : {new Date(record.date_of_assign).toLocaleDateString()}</span>
                                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-red-700 mr-2 mb-2">Deadline : {new Date(record.deadline).toLocaleDateString()}</span>
                                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{(props.taskGroup.name).replace(' ', "_")}</span>

                                                </div>
                                            </div>
                                        </div>
                                    )

                                })
                        }
                    </div>
                </div>

                {/* Task List End */}

            </div>

        </Authenticated>

    )
}

export default List
