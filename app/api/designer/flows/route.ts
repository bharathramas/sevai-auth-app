import { NextResponse } from 'next/server';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // Adjust if needed

const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tenantId = session.user['custom:tenant_id'];
  const userId = session.user.sub;

  const params = {
    TableName: 'SevAI_Designer_Flows',
    IndexName: undefined, // Optional: add GSI if needed later
    KeyConditionExpression: 'tenant_id = :tenant_id and user_id = :user_id',
    ExpressionAttributeValues: {
      ':tenant_id': { S: tenantId },
      ':user_id': { S: userId },
    },
  };

  try {
    const command = new QueryCommand(params);
    const data = await dynamoClient.send(command);

    const flows = (data.Items || []).map((item) => ({
      flowId: item.flow_id?.S || '',
      flowName: item.flow_name?.S || '',
      description: item.description?.S || '',
      createdAt: item.created_at?.S || '',
      updatedAt: item.updated_at?.S || '',
    }));

    return NextResponse.json({ flows });
  } catch (error) {
    console.error('Error fetching flows:', error);
    return NextResponse.json({ error: 'Failed to fetch flows' }, { status: 500 });
  }
}
