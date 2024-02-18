import requests
import datetime
from dotenv import load_dotenv
import os


load_dotenv()
API_KEY = os.getenv('ALPHA_API_KEY')

def get_percentage_change(symbol):
    parameters = {
        "function": "TIME_SERIES_DAILY",
        "symbol": symbol,
        "apikey": API_KEY,
    }

    url = "https://www.alphavantage.co/query"

    response = requests.get(url=url, params=parameters)
    response.raise_for_status()
    data = response.json()
    today = datetime.datetime.now().date()
    yesterday = str(today - datetime.timedelta(2))
    day_before = str(today - datetime.timedelta(3))
    if yesterday in data['Time Series (Daily)'] and day_before in data['Time Series (Daily)']:
        yesterday_close = float(data['Time Series (Daily)'][str(yesterday)]['4. close'])
        day_before_close = float(data['Time Series (Daily)'][str(day_before)]['4. close'])
        change = yesterday_close - day_before_close
        percentage = round((change/yesterday_close)*100, 2)
        return percentage
    return 0


