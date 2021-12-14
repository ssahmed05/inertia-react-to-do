import Button from '@/Components/Button'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import Authenticated from '@/Layouts/Authenticated'
import { Inertia } from '@inertiajs/inertia'
import { Head, useForm} from '@inertiajs/inertia-react'
import React from 'react'

const Add = (props) => {

    const { errors } = props;
    const { data, setData, processing } = useForm({
        name: '',
        color: '#0000',
        activeStatus: '',
    });
    const onHandleChange = (e) => {

        setData(e.target.name, e.target.value);
    }

    const submit = (e) => {

        e.preventDefault();
        Inertia.visit(route('task.group.store'), {
            method:'post',
            data: data
        });

    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Task Group {'>'} Add</h2>}
        >
            <Head title="Add Task Group" />
            <div className="py-12">

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="bg-white p-6 border-b border-gray-200">
                            <form onSubmit={submit}>
                                <div>
                                    <Label forInput="name" value="Name" />

                                    <Input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        handleChange={onHandleChange}

                                    />
                                    <span className='text-red-500'>{errors.name}</span>
                                </div>

                                <div className="mt-4">
                                    <Label forInput="color" value="Color" />
                                    <Input
                                        type='color'
                                        name="color"
                                        className="mt-1 block w-full px-3 my-2 rounded transition focus:border-blue-600 focus:outline-none"
                                        value={data.color}
                                        handleChange={onHandleChange}
                                        />
                                    <span className='text-red-500'>{errors.color}</span>
                                </div>
                                <div className="mt-4">
                                    <Label forInput="status" value="Status" />

                                    <select
                                        onChange={onHandleChange}
                                        value={data.activeStatus}
                                        name='activeStatus'
                                        className="form-select appearance-none
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding bg-no-repeat
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                        <option defaultValue >Select</option>
                                        <option value="Active">Active</option>
                                        <option value="In-active">In-Active</option>
                                    </select>
                                    <span className='text-red-500'>{errors.activeStatus}</span>
                                </div>


                                <div className="flex items-center justify-end mt-4">


                                    <Button className="ml-4" processing={processing}>
                                        Add Task Group
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

export default Add
