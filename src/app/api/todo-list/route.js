import { NextResponse } from 'next/server';

import connect from '@/dbConfig/dbConfig';
import Task from '@/models/taskModal';

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { label, status } = reqBody;

    //Add task to the db
    const newTask = new Task({
      label,
      status,
      createdAt: new Date(),
      categoryId: process.env.GENERAL_TASKS_ID,
    });

    //
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
      createdAt: task.createdAt,
      completedAt: task.completedAt,
      categoryId: task.categoryId,
    }));

    return NextResponse.json({
      success: true,
      tasks: tasksList,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const reqBody = await request.json();
    const { taskId, status, categoryId } = reqBody;

    // Find the specific task
    const task = await Task.findById({ _id: taskId });

    // Check if task exists
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Update status
    task.status = status;
    task.categoryId = categoryId || task.categoryId;

    if (status === 'active') {
      task.completedAt = '';
    } else {
      task.completedAt = new Date();
    }

    await task.save();

    return NextResponse.json({
      message: 'Task updated successfully',
      task: {
        id: task._id,
        title: task.title,
        status: task.status,
        categoryId: task.categoryId,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    // Extract taskId from the URL search params
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');

    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      );
    }

    // Check if task exists
    const task = await Task.findOne({ _id: taskId });

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 400 });
    }

    // Delete the task from the database
    const deletedTask = await Task.deleteOne({ _id: taskId });

    return NextResponse.json(
      {
        message: 'Task deleted successfully',
        task: deletedTask,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
