<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index()
    {
        $data['taskGroup'] = TaskGroup::all()->map(function($taskGroup){

            return [

                'id'     => $taskGroup->id,
                'name'   => $taskGroup->name,
                'color'  => $taskGroup->color,
                'status' => $taskGroup->status,
                'tasks'  => Task::where('task_group_id', $taskGroup->id)->get()
            ];

        });

        $data['taskForCal'] = Task::all()->map(function($tasks) {
            return [
                'id'      => $tasks->id,
                'groupId' => $tasks->task_group_id,
                'title'   => $tasks->task,
                'start'   => $tasks->date_of_assign,
                'end'     => $tasks->deadline,
                'color'   => $tasks->color,
            ];
        });

        return Inertia::render('Dashboard',$data);
    }

}
