import { NextResponse } from 'next/server';

import connect from '@/dbConfig/dbConfig';
import Task from '@/models/taskModal';

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { label, status } = reqBody;

    //Add task to the db
    const newTask = new Task({ label, status });
    const savedTask = await newTask.save();

    return NextResponse.json({
      message: 'Task added successfully',
      success: true,
      savedTask,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    //Get tasks from the db
    const tasks = await Task.find({});

    //Format the data
    const tasksList = tasks.map((task) => ({
      id: task._id,
      label: task.label,
      status: task.status,
    }));

    return NextResponse.json({
      success: true,
      tasks: tasksList,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
