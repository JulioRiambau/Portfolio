from alpha_advantage import get_percentage_change
from news import get_news
from send_sms import send_sms
from dotenv import load_dotenv
import os

load_dotenv()
CHANGE_MARGIN = 0
STOCK = os.getenv('STOCK')
COMPANY_NAME = os.getenv('COMPANY_NAME')
percentage_change = get_percentage_change(STOCK)
template = """
[COMPANY_NAME]: [Change]
Headline: [Headline]
Brief: [Content]"""

if abs(percentage_change) > CHANGE_MARGIN:
    articles = get_news(company=COMPANY_NAME)
    if percentage_change > 0:
        change = f"🔺{abs(percentage_change)}%"
    else:
        change = f"🔻{abs(percentage_change)}%"

    for article in articles:
        message = template.replace("[COMPANY_NAME]", STOCK)\
            .replace("[Change]", change).\
            replace("[Headline]", article['title']).\
            replace("[Content]", article['content'])

        print(message)
        #send_sms(message)

