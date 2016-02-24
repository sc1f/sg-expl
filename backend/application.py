# import statements
import copytext
from flask import Flask, render_template, url_for
import sys
import urllib2

# give us the settings and methods to freeze this app
import settings

# init flask
app = Flask(__name__, static_folder=settings.static_files_location,
            template_folder=settings.template_folders_location)

# amy's initial untransposed responses
# https://docs.google.com/spreadsheets/export?id=1cAMaUa0EZkUlnkA11N4wVIUEVVfbSVOwuXS0MVppAlw&exportFormat=xlsx
# grab the master sheet
# https://docs.google.com/spreadsheets/export?id=1-sUTt1w81iZjRnZA3uzt5TUqUCnHxTyQWWsz6tba018&exportFormat=xlsx

# datawork
candidates = {}

copy = copytext.Copy('dataset.xlsx')

for sheetName in copy.sheetNames():
    # ignore the master contact sheet
    if sheetName == 'Master':
        continue
    # if the photocredit is blank, write in "Photo courtesy of the candidate"
    # check for a column with purely numbers; that column will be the number of places available that we have to display
    for row in copy[sheetName]:
        dtCoverage = []

        links = row['Daily Texan Coverage URLs'].unescape().split('|||') if len(
            row['Daily Texan Coverage URLs'].unescape()) != 0 else []
        titles = row['Daily Texan Coverage Titles'].unescape().split('|||') if len(
            row['Daily Texan Coverage Titles'].unescape()) != 0 else []

        for i in xrange(len(titles)):
            dtCoverage.append({'title': titles[i], 'link': links[i]})

        try:
            campaign_website_title = BeautifulSoup(
                urllib2.urlopen(row['Campaign Website'].unescape())).title.string if len(
                row['Campaign Website'].unescape()) != 0 else ""
        except:
            print str(row['Campaign Website'].unescape()) + ": ERROR! - " + str(sys.exc_info()[0])
            campaign_website_title = row['Candidate Name'].unescape() + " Campaign Website"

        questionAnswers = []

        for key in questionKeys:
            if len(row[key].unescape()) != 0:
                questionAnswers.append((key.split('QUESTION!!!: ')[1],
                                        row[key].unescape()))

        candidateContext = {
            'headshot_photo_credit': "Credit: " + row['Photo Credit'].unescape() if row[
                                                                                        'Photo Credit'].unescape() != "" else "Credit: Melanie Westfall",
            'candidate_name': row['Candidate Name'].unescape(),
            'major': row['Major'].unescape(),
            'year': row['Year'].unescape(),
            'statement': ["The Daily Texan has no statement on file for this candidate"] if row[
                                                                                                'Statement'].unescape() == "" else
            row['Statement'].unescape().split("|||"),
            'campaign_platform_points': row['Campaign Platform Points'].unescape().split('|||') if len(
                row['Campaign Platform Points'].unescape()) != 0 else [],
            'twitter_feed_url': row['Twitter Feed URL'].unescape(),
            'twitter_user_name': row['Twitter Feed URL'].unescape().split('/')[-1],
            'campaign_website': row['Campaign Website'].unescape(),
            'campaign_website_title': campaign_website_title,
            'dt_coverage': dtCoverage,
            'question_answers': questionAnswers
        }
        candidateId = (row['Candidate Name'].unescape() + row['Major'].unescape() + row['Year'].unescape()).replace(" ",
                                                                                                                    "_").replace(
            "/", "_")

        candidates[candidateId] = candidateContext


# routing
@app.route('/')
def main():
    context = candidates
    context['sg'] = copy['sg']
    return render_template('index.html', **context)


def sub():
    context = candidates


# debug
if __name__ == '__main__': app.run(host='0.0.0.0', port=8888)
