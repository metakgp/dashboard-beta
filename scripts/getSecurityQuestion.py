import sys
import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
from bs4 import BeautifulSoup as bs
import json
import re
import pickle

ERP_HOMEPAGE_URL = 'https://erp.iitkgp.ernet.in/IIT_ERP3/'
ERP_LOGIN_URL = 'https://erp.iitkgp.ernet.in/SSOAdministration/auth.htm'
ERP_SECRET_QUESTION_URL = 'https://erp.iitkgp.ernet.in/SSOAdministration/getSecurityQues.htm'


headers = {
    'timeout': '20',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/51.0.2704.79 Chrome/51.0.2704.79 Safari/537.36',
}


def save_cookies(requests_cookiejar, filename):
    with open(filename, 'wb') as f:
        pickle.dump(requests_cookiejar, f)


def main(args):
    result = {}
    s = requests.Session()
    r = s.get(ERP_HOMEPAGE_URL)
    soup = bs(r.text, 'html.parser')
    sessionToken = soup.find_all(id='sessionToken')[0].attrs['value']
    r = s.post(ERP_SECRET_QUESTION_URL, data={'user_id': args[0]},
               headers=headers)
    save_cookies(s.cookies, args[1] + '/' + args[0])
    secret_question = r.text
    result['secret_question'] = r.text
    result['sessionToken'] = sessionToken
    json_result = json.dumps(result)
    print(json_result)

if __name__ == '__main__':
    main(sys.argv[1:])
