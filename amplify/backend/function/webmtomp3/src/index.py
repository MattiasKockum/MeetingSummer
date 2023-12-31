import boto3
from openai import OpenAI
from urllib.parse import unquote
import os
import io

def handler(event, context):
    bucket = event["Records"][0]["s3"]["bucket"]["name"]
    out_bucket = "meetingsummer-recognized-text"
    file_key = event["Records"][0]["s3"]["object"]["key"]

    print(f"event : {event}")
    print(f"original file_key : {file_key}")
    file_key = unquote(file_key)
    print(f"decoded file_key : {file_key}")

    api_key = os.getenv('OPENAI_API_KEY')
    print(f"OPENAI_API_KEY : {api_key}")

    # Download the audio data from S3
    s3 = boto3.client('s3')
    response = s3.get_object(Bucket=bucket, Key=file_key)
    audio_data = response['Body'].read()

    print(f"Downloaded audio : {audio_data}")

    # Converting into BufferedReader
    b_handle = io.BytesIO()
    b_handle.write(audio_data)
    b_handle.name = "file.webm"
    b_handle.seek(0) # This is important.
    br = io.BufferedReader(b_handle)


    # Initialize OpenAI client
    client = OpenAI()

    print(f"Successfully opened connection with OpenAI")

    # Use the audio data for transcription
    transcript = client.audio.transcriptions.create(
            model="whisper-1",
            file=br,
            response_format="text"
    )

    print(f"Obtained transcript : {transcript}")

    # Create a new S3 object for the transcribed text
    name = ''.join(file_key.split('.')[0])
    transcribed_text_key = f"{name}_transcription.txt"
    s3.put_object(
            Body=transcript.encode('utf-8'),
            Bucket=out_bucket,
            Key=transcribed_text_key
    )

    print(f"Transcribed text uploaded to: s3://{out_bucket}/{transcribed_text_key}")
