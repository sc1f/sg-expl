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
    # ignore the master contact sheet as well as the sheet detailing all the races
    if sheetName == 'Master' or sheetName == 'Categories' or sheetName == 'Races':
        continue
    for row in copy[sheetName]:
        candidateContext = {
            'photo_credit': "Photo Credit: " + row['Photo Credit'] if row[
                                                                          'Photo Credit'] != "" else "Photo courtesy of the candidate",
            'candidate_name': row['Candidate Name'],
            'URL': row['URL'],
            'major': row['Major'],#.replace('|||', ' | '),
            'year': row['Year'],#.replace('|||', ' | '),
            'position': row['Position'],
            'statement': ["The Daily Texan does not have a statement on file for this candidate."] if row[
                                                                                                          'Statement'] == "" else
            row['Statement'],
            'platform': row['Campaign Platform Points'] if#.replace('|||', '<br>')
            row[
                'Campaign Platform Points'] != '' else "The Daily Texan does not have position points on file for this candidate.",
            'twitter': row['Twitter'],
            'campaign_website': row['Campaign Website'],
            'photo_url': row['Photo URL'] + ".jpg",
        }
        #FIXME take care of ampersand issue within URL
        candidateId = (row['Candidate Name'].replace(" ","_").replace("/", "_").replace('&','').replace('|||','_').replace('.','').replace(',','')).lower()
        categoryId = ((sheetName + '_' + row['Position']).replace( " ","_").replace('+',"_").replace('-','_')).lower()

        candidates = candidateContext
        masterCandidateContext = candidates

        #debugging lines below
        #print candidates
        #rint categoryId
        #print candidateId

# routing
@app.route('/sg')
@app.route('/gsa')
@app.route('/coop')
@app.route('/union')
@app.route('/tsm')
def candidate_display():
    context = candidates
    context['Races'] = copy['Races']
    context['SG'] = copy['Student Government']
    context['GSA'] = copy['Graduate Student Assembly']
    context['Coop'] = copy['Coop']
    context['Union'] = copy['University Unions']
    context['TSM'] = copy['TSM']
    #candidateId = (context['candidate_name'] + context['major'] + context['year']).replace(" ", "_").replace("/", "_")
   #categoryId = context['position'].replace(" ","_")
    return render_template('category.html', **context)


@app.route('/')
def main_display():
    context = masterCandidateContext
    context['Races'] = copy['Races']
    context['Categories'] = copy['Categories']
    return render_template('main.html', **context)

if __name__ == '__main__': app.run(debug=True)
