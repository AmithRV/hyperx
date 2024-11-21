import { NextResponse } from 'next/server';
import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModal';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { userid, password } = reqBody;
    console.log('--------------------------------------');
    console.log('userid : ', userid);
    console.log('password : ', password);

    // Check if user exists
    const user = await User.findOne({ userid });
    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 }
      );
    }

    //check if password is correct
    const response = compare(password, user.password).then((valid) => {
      console.log('valid : ', valid);
      if (valid) {
        // Create token data
        const tokenData = {
          id: user._id,
          userid: user.userid,
        };

        //Create token
        const token = sign(tokenData, process.env.TOKEN_SECRET, {
          expiresIn: '1d',
        });

        //Create response
        const response = NextResponse.json({
          userId: user._id,
          success: true,
        });
        response.cookies.set('token', token, { httpOnly: true });

        return response;
      }
      console.log('here');
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
