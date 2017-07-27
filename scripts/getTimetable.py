import sys
import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
from bs4 import BeautifulSoup as bs
import re
import json
import pickle

ERP_HOMEPAGE_URL = 'https://erp.iitkgp.ernet.in/IIT_ERP3/'
ERP_LOGIN_URL = 'https://erp.iitkgp.ernet.in/SSOAdministration/auth.htm'
ERP_SECRET_QUESTION_URL = 'https://erp.iitkgp.ernet.in/SSOAdministration/getSecurityQues.htm'


headers = {
    'timeout': '20',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/51.0.2704.79 Chrome/51.0.2704.79 Safari/537.36',
}


def load_cookies(filename):
    with open(filename, 'rb') as f:
        return pickle.load(f)


def merge_slots(in_dict):
    for a in in_dict:
        in_dict[a] = sorted(in_dict[a])
        for i in range(len(in_dict[a]) - 1, 0, -1):
            if (in_dict[a][i][0] == in_dict[a][i - 1][0] + in_dict[a][i - 1][1]):
                in_dict[a][i - 1][1] = in_dict[a][i][1] + in_dict[a][i - 1][1]
                in_dict[a].remove(in_dict[a][i])
        in_dict[a] = in_dict[a][0]
    return (in_dict)


def main(args):
    s = requests.Session()
    s.cookies = load_cookies(args[4] + '/cookies/' + args[0])
    login_details = {
        'user_id': args[0],
        'password': args[1],
        'answer': args[2],
        'sessionToken': args[3],
        'requestedUrl': 'https://erp.iitkgp.ernet.in/IIT_ERP3/home.htm',
    }
    r = s.post(ERP_LOGIN_URL, data=login_details,
               headers=headers)
    ssoToken = re.search(r'\?ssoToken=(.+)$',
                         r.history[1].headers['Location']).group(1)

    ERP_TIMETABLE_URL = "https://erp.iitkgp.ernet.in/Acad/student/view_stud_time_table.jsp"

    timetable_details = {
        'ssoToken': ssoToken,
        'module_id': '16',
        'menu_id': '40',
    }

    # This is just a hack to get cookies. TODO: do the standard thing here
    abc = s.post('https://erp.iitkgp.ernet.in/Acad/student/view_stud_time_table.jsp',
                 headers=headers, data=timetable_details)
    cookie_val = None
    for a in s.cookies:
        if (a.path == "/Acad/"):
            cookie_val = a.value

    cookie = {
        'JSESSIONID': cookie_val,
    }
    r = s.post('https://erp.iitkgp.ernet.in/Acad/student/view_stud_time_table.jsp',
               cookies=cookie, headers=headers, data=timetable_details)

    soup = bs(r.text, 'html.parser')
    rows_head = soup.findAll('table')[2]
    trs = rows_head.findAll('tr')
    tthtml = ''.join(map(str, trs))
    with open(args[4] + '/html/' + args[0] + '.html', 'w') as htmlfile:
        htmlfile.writelines(tthtml)
    rows = rows_head.findAll('tr')
    times = []

    # For timings

    for a in rows[0].findAll('td'):
        if ('AM' in a.text or 'PM' in a.text):
            times.append(a.text)

    # For timings end
    days = {}
    # For day
    days[1] = "Monday"
    days[2] = "Tuesday"
    days[3] = "Wednesday"
    days[4] = "Thursday"
    days[5] = "Friday"
    days[6] = "Saturday"
    # For day end

    timetable_dict = {}

    for i in range(1, len(rows) - 1):
        timetable_dict[days[i]] = {}
        tds = rows[i].findAll('td')
        time = 0
        for a in range(1, len(tds)):
            txt = tds[a].find('b').text.strip()
            if (len(txt) >= 7):
                timetable_dict[days[i]][times[time]] = list((tds[a].find('b').text[:7], tds[
                    a].find('b').text[7:], int(tds[a]._attr_value_as_string('colspan'))))
            time = time + int(tds[a]._attr_value_as_string('colspan'))

    for day in timetable_dict.keys():
        subject_timings = {}
        for time in timetable_dict[day]:
            flattened_time = int(time[:time.find(':')])
            if (flattened_time < 6):
                flattened_time += 12
            if (not timetable_dict[day][time][0] in subject_timings.keys()):
                subject_timings[timetable_dict[day][time][0]] = []
            subject_timings[timetable_dict[day][time][0]].append(
                [flattened_time, timetable_dict[day][time][2]])
        subject_timings = merge_slots(subject_timings)
        for time in list(timetable_dict[day].keys()):
            flattened_time = int(time[:time.find(':')])
            if (flattened_time < 6):
                flattened_time += 12
            if (not flattened_time == subject_timings[timetable_dict[day][time][0]][0]):
                del (timetable_dict[day][time])
            else:
                timetable_dict[day][time][2] = subject_timings[
                    timetable_dict[day][time][0]][1]

    with open(args[4] + '/timetables/' + args[0], 'w') as outfile:
        json.dump(timetable_dict, outfile, indent=4, ensure_ascii=False)

    # print("Timetable saved to file on server")

if __name__ == '__main__':
    main(sys.argv[1:])
