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

export async function DELETE(request) {
  try {
    // Extract categoryId from the URL search params
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    if (!categoryId) {
      return NextResponse.json(
        { error: 'categoryId is required' },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: 'Category deleted successfully',
        task: category,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
