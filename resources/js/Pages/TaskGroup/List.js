import Authenticated from '@/Layouts/Authenticated'
import React, { Fragment } from 'react'
import { Head, InertiaLink } from '@inertiajs/inertia-react'
import Button from '@/Components/Button'

const List = (props) => {
    return (

        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Task Group {'>'} List</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="bg-black text-white p-6 border-b border-gray-200">
                            <label htmlFor="">List Of Task Groups</label>

                            <InertiaLink href={route('task.group.add')}>
                              <Button className='bg-indigo-500 float-right' style={{marginTop:"-5px"}}>Add More</Button>
                            </InertiaLink>

                        </div>

                    </div>
                </div>
                {
                    props.groupList.map((record) => {
                        // return console.log(record);
                        return(

                            <div key={record.id} className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                <div className="bg-white p-6 mt-5 border-b shadow-sm border-purple-400">
                                    <div className="flex justify-between">
                                        <label htmlFor="" className='m-3 text-md'>MPA</label>
                                        <Button>Open</Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>



        </Authenticated>

    )
}

export default List
