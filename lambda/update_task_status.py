import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TASKS_TABLE'])

def lambda_handler(event, context):
    data = json.loads(event['body'])
    taskId = data['taskId']
    status = data['status']

    table.update_item(
        Key={'taskId': taskId},
        UpdateExpression='SET #s = :s',
        ExpressionAttributeNames={'#s': 'status'},
        ExpressionAttributeValues={':s': status}
    )

    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Task status updated'})
    }
