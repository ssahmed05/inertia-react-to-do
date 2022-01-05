import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { PieChart } from 'react-minimal-pie-chart';
import Calender from '@/Components/Calender';

export default function Dashboard(props) {

    const {taskGroup, taskForCal} = props;

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                    <p className="font-semibold text-xl text-gray-800 leading-tight">
                        Home <span className='float-right text-normal font-medium'>Hey! Welcome <span className='font-bold'>{props.auth.user.name}</span></span>
                    </p>
                }
        >
            <Head title="Dashboard" />

            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-10">
                        <h1 className="font-bold text-3xl text-center">Task Calender</h1>
                        <Calender
                        events={taskForCal}
                        />

                    </div>
                </div>
            </div>
            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <h1 className="font-bold text-3xl text-center">Task Details</h1>

                </div>
            </div>
            {/* <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-4">
                        {
                            taskGroup.map(taskGr => {

                                let task = taskGr.tasks;
                                let shittyTask = task.map(tasky => {return { title: tasky.task + " ("+ tasky.status  +"%)", value:  Number(tasky.status)  , color: random_bg_color() } });

                                // console.log(taskGr.tasks.map(tasky => {return tasky.task}))

                                return (
                                    task.length === 0 ? "" :
                                    <>

                                        <PieChart
                                        children={ <p>Sheesh</p>}
                                        className='shadow-lg bg-gray-600 p-5'
                                        key={taskGr.id}
                                        animationDuration={500}
                                        animationEasing="ease-out"
                                        labelPosition={90}
                                        animate={true}
                                        style={{height:'400px'}}

                                        label={(pp) => { return pp.dataEntry.title;}}

                                        labelStyle={{
                                            fill: 'white',
                                            fontSize: '5px',
                                            fontWeight: "800",
                                        }}
                                        data={shittyTask}
                                        />



                                    </>
                                )

                            })
                        }

                    </div>



                </div>
            </div> */}
        </Authenticated>
    );
}
