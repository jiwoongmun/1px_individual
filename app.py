import os
from flask import Flask, render_template, url_for, redirect, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import time
import json
from flask_cors import CORS



#############################
######initial set up ########
#############################
app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecretkey'
### DB setup ###
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
CORS(app)

db = SQLAlchemy(app)
Migrate(app, db)

class image_table(db.Model):
    __tablename__ = 'image_table'
    id = db.Column(db.Integer, primary_key = True)
    image = db.Column(db.Text)

    def __init__(self, image):
        self.image = image
    def __repr__(self):
        return f"{self.id}"

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/main_uk')
def main_uk():
    return render_template('sub1/sub-uk.html')

@app.route('/main_us')
def main_us():
    return render_template('sub1/sub-us.html')

@app.route('/main_uk/details')
def uk_details():
    return render_template('sub2/sub2-uk.html')

@app.route('/main_us/details')
def us_details():
    return render_template('sub2/sub2-us.html')

@app.route("/db_save", methods=['GET', 'POST'])
def db_save():
    param = json.loads(request.data)
    print(param)
    # base64_data = param['keyword'].split(':')[1]  # Remove the "data:image/png;base64," prefix
    base64_data = param['keyword']
    print(base64_data)
    new_item = image_table(base64_data)
    db.session.add(new_item)
    db.session.commit()
    return json.dumps(base64_data,ensure_ascii=False)

@app.route('/archive', methods=['GET', 'POST'])
def archive():

    # if (data):
        # new_item = image_table(data)
        # db.session.add(new_item)
        # db.session.commit()
    #     images = image_table.query.order_by(image_table.id.desc()).all()
        
    # else: 
    #     data = request.form.get('image')
    #     if (data):
    #         new_item = image_table(data)
    #         db.session.add(new_item)
    #         db.session.commit()
    images = image_table.query.order_by(image_table.id.desc()).all()
    return render_template('sub3/sub3.html', images=images)

if __name__ == "__main__":
    app.run(debug = True)