import connect from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';
import Task from '@/models/taskModal';

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { tasks } = reqBody;
    console.log('tasks : ', tasks);

    // Perform bulk insert
    const result = await Task.insertMany(tasks);

    return NextResponse.json({
      message: "Task's added successfully",
      success: true,
      savedTasks: result,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
