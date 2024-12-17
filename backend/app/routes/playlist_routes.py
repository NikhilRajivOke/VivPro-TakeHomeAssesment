from flask import Blueprint, jsonify, request, Response
from app.services.playlist_service import get_all_songs,serialize_song,get_song_by_title,update_song_rating_by_id
import json

songs_bp = Blueprint('songs',__name__)

@songs_bp.route('',methods=['GET'])
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
    return Response(
        json.dumps(response,sort_keys=False),
        status = 200,
        mimetype = 'application/json'
    )
    
@songs_bp.route('/<string:title>', methods=['GET'])
def getSongByTitle(title):
    song = get_song_by_title(title)

    if song:
        song_data = serialize_song(song)
        return Response(
            json.dumps(song_data, sort_keys=False),
            mimetype='application/json'
        )
    else:
        return jsonify({"error": "Song not found"}), 404


@songs_bp.route('/<string:id>/<rating>', methods=['PUT'])
def updateSongRating(id,rating):
    try:
        rating = float(rating)
    except ValueError:
        return jsonify({"error": "Invalid input. 'id' and 'rating' are required."}), 400

    if not id or rating is None:
        return jsonify({"error": "Invalid input. 'id' and 'rating' are required."}), 400

    print(f'id : {id} and rating : {rating}')
    updated_song = update_song_rating_by_id(id,rating)

    if updated_song:
        updated_song_data = serialize_song(updated_song)
        return Response(
            json.dumps(updated_song_data, sort_keys=False),
            status=200,
            mimetype='application/json'
        )
    else:
        return jsonify({"error": "Song not found"}), 404


