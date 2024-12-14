from flask import Flask, Blueprint
import json
from routes import songs_bp
from models import db, Song

app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../playlist.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

def insert_data():
    with open('./data/playlist.json','r') as file:
        data = json.load(file)

    songs = [
        Song(
            id = data["id"].get(str(key)),
            title = data["title"].get(key),
            danceability = data["danceability"].get(key),
            energy = data["energy"].get(key),
            mode = data["mode"].get(key),
            acousticness = data["acousticness"].get(key),
            tempo = data["tempo"].get(key),
            duration_ms = data["duration_ms"].get(key),
            num_sections = data["num_sections"].get(key),
            num_segments = data["num_segments"].get(key)
        )
        for key in data["id"].keys()
    ]

    with app.app_context():
        try:
            db.session.bulk_save_objects(songs)
            db.session.commit()
        except Exception as e:
            db.session.rollback()

app.register_blueprint(songs_bp,url_prefix='/')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        insert_data()
    app.run(debug=True)
