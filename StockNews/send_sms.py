from twilio.rest import Client
from dotenv import load_dotenv
import os

def send_sms(body):
    account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    auth_token  = os.getenv('TWILIO_AUTH_TOKEN')

    client = Client(account_sid, auth_token)

    message = client.messages.create(
        to=os.getenv('DEST_PHONE'),
        from_=os.getenv('SRC_PHONE'),
        body=body)