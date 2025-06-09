import json
import boto3
import time
import uuid
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TASKS_TABLE'])

def lambda_handler(event, context):
    data = json.loads(event['body'])
    task = {
        'taskId': str(uuid.uuid4()),
        'title': data['title'],
        'description': data['description'],
        'assignedTo': data['assignedTo'],
        'deadline': data['deadline'],
        'status': 'Pending',
        'createdAt': int(time.time())
    }
    table.put_item(Item=task)
    return {
        'statusCode': 201,
        'body': json.dumps({'message': 'Task created', 'taskId': task['taskId']})
    }
