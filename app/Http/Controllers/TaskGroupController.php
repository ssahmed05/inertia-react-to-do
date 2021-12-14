<?php

namespace App\Http\Controllers;

use App\Models\TaskGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class TaskGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('TaskGroup/List');
    }

    public function taskGroupList(){

        $data = TaskGroup::paginate(5);
        return $data;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       return Inertia::render('TaskGroup/Add');

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required',
            'activeStatus' => 'required',
        ]);

        $taskGroup = new TaskGroup;
        $taskGroup->name   = $request->name ;
        $taskGroup->color  = $request->color ;
        $taskGroup->status = $request->activeStatus ;
        $taskGroup->save();
        return redirect()->route('task.group.list')->with('message' , "Task Group Added");

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TaskGroup  $taskGroup
     * @return \Illuminate\Http\Response
     */
    public function show(TaskGroup $taskGroup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TaskGroup  $taskGroup
     * @return \Illuminate\Http\Response
     */
    public function edit(TaskGroup $taskGroup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TaskGroup  $taskGroup
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TaskGroup $taskGroup)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TaskGroup  $taskGroup
     * @return \Illuminate\Http\Response
     */
    public function destroy(TaskGroup $taskGroup)
    {
        //
    }
}
