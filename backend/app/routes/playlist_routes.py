from flask import Blueprint, jsonify
from services.playlist_service import get_all_songs,serialize_song,get_song_by_title


songs_bp = Blueprint('songs',__name__)

@songs_bp.route('/songs',methods=['GET'])
def getAllSongs():
    songs  = get_all_songs()
    songs_data = [serialize_song(song) for song in songs]
    return jsonify(songs_data)
    
@songs_bp.route('/songs/<string:title>', methods=['GET'])
def getSongByTitle(title):
    song = get_song_by_title(title)

    if song:
        return jsonify(serialize_song(song))
    else:
        return jsonify({"error": "Song not found"}), 404



@songs_bp.route('/getHello')
def getHello():
    return "Hello from different url"
