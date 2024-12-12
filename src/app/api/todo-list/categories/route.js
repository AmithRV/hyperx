import { NextResponse } from 'next/server';

import Category from '@/models/categoryModal';

import connect from '@/dbConfig/dbConfig';

connect();

export async function GET() {
  try {
    //Get categories from the db
    const categories = await Category.find({});

    //Format the data
    const categoriesList = categories.map((category) => ({
      id: category._id,
      label: category.label,
    }));

    return NextResponse.json({
      success: true,
      categories: categoriesList,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { label } = reqBody;

    //Add category to the db
    const newCategory = new Category({ label });
    const savedCategory = await newCategory.save();

    return NextResponse.json({
      message: 'category added successfully',
      success: true,
      category: savedCategory,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    //
  } catch (error) {
    //
  }
}
