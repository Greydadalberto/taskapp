import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TASKS_TABLE'])

def lambda_handler(event, context):
    user = event['queryStringParameters'].get('user')  # pass ?user=email@example.com
    response = table.scan()
    tasks = response.get('Items', [])

    if user:
        tasks = [task for task in tasks if task.get('assignedTo') == user]

    return {
        'statusCode': 200,
        'body': json.dumps(tasks)
    }
