import requests
import datetime
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv('NEWS_API_KEY')

def get_news(company):
    today = datetime.datetime.now().date()
    yesterday = today - datetime.timedelta(1)
    parameters = {
        "q": company,
        "from": yesterday,
        "searchIn": "title",
        "sortBy": "publishedAt",
        "language": "en",
        "apikey": API_KEY,
    }

    url = "https://newsapi.org/v2/everything"

    response = requests.get(url=url, params=parameters)
    response.raise_for_status()
    data = response.json()
    articles = data['articles'][0:3]
    return articles
