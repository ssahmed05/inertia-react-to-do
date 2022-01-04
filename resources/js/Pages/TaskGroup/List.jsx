import Authenticated from '@/Layouts/Authenticated'
import React, { Fragment, useEffect, useState } from 'react'
import { Head, InertiaLink } from '@inertiajs/inertia-react'
import Button from '@/Components/Button'
import Pagination from "react-js-pagination"
import { Inertia } from '@inertiajs/inertia'

const List = (props) => {


    const [alert, setAlert] = useState(props.flash.message != null ? true : false);

    const [state, setData] = useState({
        groupList: ''
    });

    const fetchData = async (pageNumber = 1) => {

        const api = await fetch(`/Task-Group-List?page=${pageNumber}`);

        setData({
            groupList: await api.json()

        });

    };

    const openTasks = (id) => {
        Inertia.visit(route('task.list', id), { method: 'get' });
    }
    useEffect(() => {
        fetchData();

    }, [])

    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Task Group {'>'} List</h2>}
        >
            <Head title="Task Groups" />
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
                    <div className="overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="bg-indigo-800 text-white p-6 border-b border-gray-200">
                            <label htmlFor="">List Of Task Groups</label>

                            <InertiaLink href={route('task.group.add')}>
                                <Button className='bg-indigo-500 float-right' style={{ marginTop: "-5px" }}>Add More</Button>
                            </InertiaLink>

                        </div>

                    </div>
                </div>

                {
                    state?.groupList?.data ?
                        state.groupList.data.map((record) => {
                            return (
                                <div key={record.id} className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                    <div className="
                                            transition
                                            transform
                                            hover:-translate-y-1.5
                                            motion-reduce:transition-none
                                            motion-reduce:transform-none
                                            bg-white
                                            hover:bg-yellow-100
                                            p-6 mt-5
                                            shadow-lg
                                            cursor-pointer
                                            border-b-4 border-yellow-500"
                                        onClick={() => openTasks(record.id)}
                                    >
                                        <div className="flex justify-between">
                                            <div>

                                                <label className='m-3 text-md'>{record.name}</label>
                                                {record.tasks != 0 ? (
                                                    <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-sm font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                                    {record.tasks}
                                                </span>
                                                ) : ""}


                                            </div>

                                            <div>
                                                {/* <InertiaLink href={route('task.list', { id: record.id })}>
                                                    <Button className=' bg-indigo-500 mx-1 '>Open</Button>
                                                </InertiaLink> */}
                                                <InertiaLink onClick={(e) => e.stopPropagation()} href={route('task.group.edit', record.id)} >
                                                    <Button className='bg-green-500 mx-1'>Edit</Button>
                                                </InertiaLink>
                                                <InertiaLink onClick={(e) => e.stopPropagation()} href={route('task.group.remove', record.id)} >
                                                    <Button className='bg-red-500 mx-1'>Delete</Button>
                                                </InertiaLink>
                                            </div>
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
                }
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-lg sm:rounded-lg ">
                        <div className="flex justify-center mt-2">

                            <Pagination
                                activePage={state?.groupList?.current_page ? state?.groupList?.current_page : 0}
                                itemsCountPerPage={state?.groupList?.per_page ? state?.groupList?.per_page : 0}
                                totalItemsCount={state?.groupList?.total ? state?.groupList?.total : 0}
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
