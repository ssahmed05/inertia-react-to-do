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

        return Inertia::render('Dashboard',$data);
    }

}
