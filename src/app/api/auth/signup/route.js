import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModal';
import { NextResponse } from 'next/server';

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { userid, password } = reqBody;

    // Check if user already exists
    const user = await User.findOne({ userid });

    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }
    //Add user to the db
    const newUser = new User({ userid, password });
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
