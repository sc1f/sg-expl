# import statements
import copytext
import json
from flask import Flask, render_template, url_for
import os
import sys
import urllib2

# give us the settings and methods to freeze this app
import settings

#init flask
app = Flask(__name__, static_folder=settings.static_files_location, 
	        template_folder=settings.template_folders_location)

# amy's initial untransposed responses
# https://docs.google.com/spreadsheets/export?id=1cAMaUa0EZkUlnkA11N4wVIUEVVfbSVOwuXS0MVppAlw&exportFormat=xlsx
# grab the master sheet
# https://docs.google.com/spreadsheets/export?id=1-sUTt1w81iZjRnZA3uzt5TUqUCnHxTyQWWsz6tba018&exportFormat=xlsx

#datawork
candidates = {}

copy = copytext.Copy('dataset.xlsx')

for sheetName in copy.sheetNames():
    # ignore the master contact sheet
	if sheetName == 'Master':
		continue
        # if the photocredit is blank, write in "Photo courtesy of the candidate"
        # check for a column with purely numbers; that column will be the number of places available that we have to display
	for row in copy[sheetName]:
		candidateContext = {
				'name' : row['cand_name'].unescape(),
				'position': row['position'].unescape(),
				'major': row['major'].unescape(),
				'year': row['year'].unescape(),
				'biography': row['bio'].unescape(),
				'endorsements': row['endors'].unescape(),
				'platform': row['plat'].unescape(),
				'facebook': row['fb'].unescape(),
				'website': row['site'].unescape(),
				'photocred': row['pcred'].unescape(),
				'photo': row['purl'].unescape()
			}
	candidates = candidateContext
#routing
@app.route('/')
def main():
	context = candidates
	context['sg'] = copy['sg']
	return render_template('index.html', **context)
def sub():
	context = candidates
#debug
if __name__ == '__main__': app.run(host='0.0.0.0', port=8888)
