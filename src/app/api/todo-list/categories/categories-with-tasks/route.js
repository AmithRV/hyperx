import { NextResponse } from 'next/server';

import Category from '@/models/categoryModal';

import connect from '@/dbConfig/dbConfig';

connect();

export async function GET() {
  try {
    const result = await Category.aggregate([
      {
        $lookup: {
          from: 'tasks',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'associated_tasks',
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      categories: result,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
