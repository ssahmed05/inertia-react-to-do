import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { PieChart } from 'react-minimal-pie-chart';


export default function Dashboard(props) {

    const {taskGroup} = props;

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">Hey! Welcome <span className='font-bold'>{props.auth.user.name}</span></div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white grid grid-cols-2 gap-4">
                        {
                            taskGroup.map(taskGr => {

                                let task = taskGr.tasks;
                                let shittyTask = task.map(tasky => {return { title: tasky.task, value:  50  , color: "#" + ((1<<24)*Math.random() | 0).toString(16) } });
                                console.log(shittyTask);
                                // console.log(taskGr.tasks.map(tasky => {return tasky.task}))

                                return (
                                    <PieChart
                                    key={taskGr.id}
                                    animate={true}
                                    style={{height:'400px'}}
                                    // labelPosition={10}
                                    label={(props) => { return props.dataEntry.title;}}
                                    labelStyle={{
                                        fill: 'white',
                                        fontSize: '3px'
                                   }}
                                   data={shittyTask}
                                //    data={[
                                //        { title: 'A', value: 40, color: "#" + ((1<<24)*Math.random() | 0).toString(16) },
                                //        { title: 'B', value: 15, color: "#" + ((1<<24)*Math.random() | 0).toString(16) },
                                //        { title: 'C', value: 20, color: "#" + ((1<<24)*Math.random() | 0).toString(16) },
                                //    ]}

                                    />
                                )

                            })
                        }

                    </div>



                </div>
            </div>
        </Authenticated>
    );
}
