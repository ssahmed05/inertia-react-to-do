import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { PieChart } from 'react-minimal-pie-chart';


export default function Dashboard(props) {

    const {taskGroup} = props;

    const  random_bg_color = () => {  //Generate random colors expect white shades

        const rangeSize = 100; // adapt as needed
        let x = Math.floor(Math.random() * 256);
        let y = 100+ Math.floor(Math.random() * rangeSize);
        let z = 50+ Math.floor(Math.random() * rangeSize);
        let bgColor = "rgb(" + x + "," + y + "," + z + ")";
         return bgColor.toString();
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">Hey! Welcome <span className='font-bold'>{props.auth.user.name}</span></div>
                    </div>
                </div>
            </div>
            <div className="py-10">
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
            </div>
        </Authenticated>
    );
}
