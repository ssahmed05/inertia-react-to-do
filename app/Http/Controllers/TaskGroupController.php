<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use DB;

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

        $data->getCollection()->transform(function($row){ // to append my required data in pagination
            return [
                'id'   => $row->id,
                'name' => $row->name,
                'status' => $row->status,
                'tasks' => Task::where('task_group_id', $row->id)->count()
            ];
        });
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
            'activeStatus' => 'required',
        ]);

        $taskGroup = new TaskGroup;
        $taskGroup->name   = $request->name ;
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
    public function edit($id)
    {

        $data['taskGroup'] = TaskGroup::find($id)->get(['id','name','status'])->first();
        return Inertia::render('TaskGroup/Edit', $data);
        // $taskGroup = DB::table('task_groups')
        //             ->select('id', 'name', 'status', 'color')
        //             ->where('id', $id)
        //             ->get();

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TaskGroup  $taskGroup
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'activeStatus' => 'required',
        ]);

        $taskGrp = TaskGroup::find($id);
        $taskGrp->name = $request->name;
        $taskGrp->status = $request->activeStatus;
        $taskGrp->save();
        return redirect()->route('task.group.list')->with('message' , "Task Group Edited");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TaskGroup  $taskGroup
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $taskGroup = TaskGroup::find($id);
        $taskGroup->delete();

        $task = Task::where('task_group_id',$id)->delete();
        return back();
    }
}
