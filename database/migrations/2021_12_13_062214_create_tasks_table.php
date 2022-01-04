<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {

            $table->id();
            $table->string('task_group_id');
            $table->string('task');
            $table->string('explaination');
            $table->string('status');
            $table->sting('color');
            $table->date('date_of_assign');
            $table->date('deadline');
            $table->date('date_of_complete')->nullable();
            $table->string('created_by');

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
