from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Song(db.Model):
    index = db.Column(db.Integer, autoincrement=True)
    id = db.Column(db.String(255),primary_key=True)
    title = db.Column(db.String(255),nullable=False)
    danceability = db.Column(db.Float,nullable=False)
    energy = db.Column(db.Float,nullable=False)
    mode = db.Column(db.Integer,nullable=False)
    acousticness = db.Column(db.Float,nullable=False)
    tempo = db.Column(db.Float,nullable=False)
    duration_ms = db.Column(db.Float,nullable=False)
    num_sections = db.Column(db.Integer,nullable=False)
    num_segments = db.Column(db.Integer,nullable=False)
    rating = db.Column(db.Float,nullable=True)

    def __repr__(self):
        return f"<Item {self.id} - {self.title}>"
    
