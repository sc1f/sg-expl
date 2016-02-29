from flask_frozen import Freezer
import copytext
from application import app

import settings

app.config['FREEZER_DESTINATION'] = "../web_app"
app.config['FREEZER_RELATIVE_URLS'] = True

freezer = Freezer(app)

if __name__ == '__main__': 
	freezer.freeze()