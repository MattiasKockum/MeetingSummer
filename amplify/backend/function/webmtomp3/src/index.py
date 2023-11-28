import boto3
from openai import OpenAI

def handler(event, context):
    bucket = event["Records"][0]["s3"]["bucket"]["name"]
    file_key = event["Records"][0]["s3"]["object"]["key"]

    print(f"event : {event}")
    print(f"original file_key : {file_key}")
    file_key = "private/eu-west-3:b6bb18b2-7e44-4a90-8e7e-9520e5c97b25/b37d8f0c-32d2-4c03-8c0a-6e1a984a9c732023-11-25T21:28:08.553Z.webm"
    print(f"modified file_key : {file_key}")

    # Download the audio data from S3
    s3 = boto3.client('s3')
    response = s3.get_object(Bucket=bucket, Key=file_key)
    audio_data = response['Body'].read()

    print(f"Downloaded audio : {audio_data}")

    # Initialize OpenAI client
    client = OpenAI()

    print(f"Successfully oppened connection with OpenAI")

    # Use the audio data for transcription
    transcript = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_data
    )

    print(f"Obtained transcript : {transcript}")

    # Create a new S3 object for the transcribed text
    transcribed_text_key = f"{file_key.split('.')[0]}-transcription.txt"
    s3.put_object(Body=transcript.encode('utf-8'), Bucket=bucket, Key=transcribed_text_key)

    print(f"Transcribed text uploaded to: s3://{bucket}/{transcribed_text_key}")
