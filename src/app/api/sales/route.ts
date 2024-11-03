import { NextResponse } from 'next/server';

export async function GET() {
  try {
    var pickdate = '2024-11-02'; //just for testing
 
  
    console.log(pickdate);


    const response = await fetch(`${process.env.API_SERVER_ROOT}/api/getDnevniPazar?date=${pickdate}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
} 