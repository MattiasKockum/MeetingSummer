import boto3
from openai import OpenAI
from urllib.parse import unquote
import os

def handler(event, context):

    preprompt = "Summerise this meeting, multiple people are speaking in a speech to text device and here is the result : "

    bucket = event["Records"][0]["s3"]["bucket"]["name"]
    out_bucket = "meetingsummer-summed-up-text"
    file_key = event["Records"][0]["s3"]["object"]["key"]

    print(f"event : {event}")
    print(f"original file_key : {file_key}")
    file_key = unquote(file_key)
    print(f"decoded file_key : {file_key}")

    api_key = os.getenv('OPENAI_API_KEY')
    print(f"OPENAI_API_KEY : {api_key}")

    # Download the text data from S3
    s3 = boto3.client('s3')
    response = s3.get_object(Bucket=bucket, Key=file_key)
    meeting_text = response['Body'].read()

    print(f"Downloaded text : {meeting_text}")

    # Initialize OpenAI client
    client = OpenAI()

    print(f"Successfully opened connection with OpenAI")

    # Use the audio data for abstraction
    abstract = client.chat.completions.create(
            messages=[{
                "role": "user",
                "content": preprompt + meeting_text
                }]
    )

    print(f"Obtained abstract : {abstract}")

    # Create a new S3 object for the transcribed text
    name = ''.join(file_key.split('.')[0])
    transcribed_text_key = f"{name}_abstraction.txt"
    s3.put_object(
            Body=abstract.encode('utf-8'),
            Bucket=out_bucket,
            Key=transcribed_text_key
    )

    print(f"Transcribed text uploaded to: s3://{out_bucket}/{transcribed_text_key}")
