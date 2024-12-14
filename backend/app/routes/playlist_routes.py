from flask import Blueprint, jsonify, request
from services.playlist_service import get_all_songs,serialize_song,get_song_by_title


songs_bp = Blueprint('songs',__name__)

@songs_bp.route('/songs',methods=['GET'])
def getAllSongs():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    paginated_songs  = get_all_songs(page,per_page)

    songs_data = [serialize_song(song) for song in paginated_songs]

    response = {
        'total' : paginated_songs.total,
        'page' : page,
        'per_page': per_page,
        'total_pages' : paginated_songs.pages,
        'songs' : songs_data
    }
    return jsonify(response)
    
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
