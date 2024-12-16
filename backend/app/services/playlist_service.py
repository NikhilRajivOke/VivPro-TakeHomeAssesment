from app.models.songs import Song
from collections import OrderedDict
from app.database import db

def get_all_songs(page,per_page):
    print("page : " , page , " pagesize :", per_page)
    return Song.query.paginate(page=page,per_page=per_page,error_out=False)

def get_song_by_title(search_title):
    return Song.query.filter_by(title = search_title).first()

def update_song_rating_by_id(song_id, new_rating):
    song = Song.query.get(song_id)

    if song:
        song.rating = new_rating
        db.session.commit()
        return song

    return None

def serialize_song(song):
    return {
        'id': song.id,
        'title': song.title,
        'danceability': song.danceability,
        'energy': song.energy,
        'mode': song.mode,
        'acousticness': song.acousticness,
        'tempo': song.tempo,
        'duration_ms': song.duration_ms,
        'num_sections': song.num_sections,
        'num_segments': song.num_segments,
        'rating': song.rating
    }