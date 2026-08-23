import { NextResponse } from 'next/server';
import { findUserByPhone, createUser } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { phone, password, isRegister, name } = await request.json();

    if (!phone || !password) {
      return NextResponse.json(
        { success: false, message: 'Phone number and password are required.' },
        { status: 400 }
      );
    }

    if (isRegister) {
      try {
        const newUser = createUser(phone, password, name || 'Citizen');
        return NextResponse.json({
          success: true,
          user: {
            id: newUser.id,
            phone: newUser.phone,
            name: newUser.name
          }
        });
      } catch (err: any) {
        return NextResponse.json(
          { success: false, message: err.message || 'Registration failed.' },
          { status: 400 }
        );
      }
    } else {
      const user = findUserByPhone(phone);
      if (!user || user.password !== password) {
        return NextResponse.json(
          { success: false, message: 'Invalid phone number or password. You can use demo phone: 9999999999 / pass: password123' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          phone: user.phone,
          name: user.name
        }
      });
    }
  } catch (e: any) {
    console.error('Auth error', e);
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
