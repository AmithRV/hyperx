import { NextResponse } from 'next/server';

import Category from '@/models/categoryModal';
import connect from '@/dbConfig/dbConfig';

connect();

export async function GET() {
  try {
    //Get categories from the db
    const categories = await Category.find({});

    return NextResponse.json({
      success: true,
      categories: categories,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
