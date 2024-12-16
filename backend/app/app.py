from flask import Flask, Blueprint
import json
from app.routes.playlist_routes import songs_bp
from app.models.songs import Song
from flask_cors import CORS
from app.database import db

def create_app():
    # Create Flask app instance
    app = Flask(__name__)

    # Enable Cross-Origin Resource Sharing (CORS)
    CORS(app)

    # App configurations
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../playlist.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize database with app
    db.init_app(app)

    # Register routes
    app.register_blueprint(songs_bp, url_prefix='/songs')

    # Function to insert data into database (if required)
    def insert_data():
        with open('app/data/playlist.json', 'r') as file:
            data = json.load(file)

        songs = [
            Song(
                id=data["id"].get(str(key)),
                title=data["title"].get(key),
                danceability=data["danceability"].get(key),
                energy=data["energy"].get(key),
                mode=data["mode"].get(key),
                acousticness=data["acousticness"].get(key),
                tempo=data["tempo"].get(key),
                duration_ms=data["duration_ms"].get(key),
                num_sections=data["num_sections"].get(key),
                num_segments=data["num_segments"].get(key)
            )
            for key in data["id"].keys()
        ]

        with app.app_context():
            try:
                db.session.bulk_save_objects(songs)
                db.session.commit()
            except Exception as e:
                db.session.rollback()

    with app.app_context():
        db.create_all()
        insert_data()

    return app


if __name__ == '__main__':
    app = create_app() 
    app.run(debug=True)
