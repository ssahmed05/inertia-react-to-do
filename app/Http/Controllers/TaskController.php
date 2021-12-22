<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{

    public function index($id)
    {
        return Inertia::render('Task/List', [
            'id' => $id,
            'taskGroup' => TaskGroup::find($id)
        ]);
    }

    public function taskList($id){

        $data = Task::where('task_group_id',$id)->paginate(10);
        return $data;

    }

    public function create($taskGroupId)
    {
        $taskGroup = TaskGroup::find($taskGroupId);
        $data['taskGroup'] = $taskGroup;

        return Inertia::render('Task/Add', $data);
    }

    public function store(Request $request)
    {


        $request->validate([
            'task' => 'required|string|max:255',
            'explanation' => 'required',
            'date_of_assign' => 'required',
            'deadline' => 'required',
        ]);

        $task = new Task;
        $task->task_group_id  = $request->taskGroupId;
        $task->task           = $request->task;
        $task->explaination   = $request->explanation;
        $task->status         = "Pending";
        $task->date_of_assign = date("Y-m-d",strtotime($request->date_of_assign));
        $task->deadline       = date("Y-m-d",strtotime($request->deadline));
        $task->created_by     = $request->created_by;
        $task->save();

        return redirect()->route('task.list', ['id' => $request->taskGroupId])->with('message' , "New Task Added");

    }


    public function edit(Task $task, $id)
    {
        $data['task'] = $task->find($id);
        return Inertia::render("Task/Edit", $data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'task' => 'required|string|max:255',
            'explanation' => 'required',
            'date_of_assign' => 'required',
            'deadline' => 'required',
        ]);

        $task                 = Task::find($id);
        $task->task           = $request->task;
        $task->explaination   = $request->explanation;
        $task->date_of_assign = date("Y-m-d",strtotime($request->date_of_assign));
        $task->deadline       = date("Y-m-d",strtotime($request->deadline));
        $task->save();

        if($task->save()) {
            return redirect()->route('task.list', ['id' => $request->taskGroupId]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task, $id)
    {
        $resp = $task->destroy($id);
        return back(302);
    }
}
