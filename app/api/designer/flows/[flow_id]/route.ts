import { NextResponse } from 'next/server';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });

export async function GET(request: Request, { params }: { params: { flow_id: string } }) {
  const { flow_id } = params;

  if (!flow_id) {
    return NextResponse.json({ error: 'Missing flow_id' }, { status: 400 });
  }

  try {
    const command = new GetItemCommand({
      TableName: 'SevAI_Designer_Flows',
      Key: {
        flow_id: { S: flow_id }
      },
    });

    const data = await dynamoClient.send(command);

    if (!data.Item) {
      return NextResponse.json({ error: 'Flow not found' }, { status: 404 });
    }

    const flowJson = data.Item.flow_json?.S ? JSON.parse(data.Item.flow_json.S) : {};

    return NextResponse.json({ flowJson });
  } catch (error) {
    console.error('Error fetching flow:', error);
    return NextResponse.json({ error: 'Failed to fetch flow' }, { status: 500 });
  }
}
