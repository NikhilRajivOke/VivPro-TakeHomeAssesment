import pytest
from app.app import create_app
from app.models.songs import Song
from app.services.playlist_service import get_all_songs, get_song_by_title, update_song_rating_by_id
from unittest.mock import patch, MagicMock
import json

# Fixture to create the app
@pytest.fixture
def app():
    app = create_app()
    app.config['TESTING'] = True
    return app

# Fixture to create the test client
@pytest.fixture
def client(app):
    return app.test_client()

def test_get_all_songs(client):
    with patch('app.routes.playlist_routes.get_all_songs') as mock_get_all_songs:
        mock_paginated_songs = MagicMock()
        mock_paginated_songs.total = 100
        mock_paginated_songs.pages = 2
        mock_paginated_songs.items = [MagicMock(id=i, title=f'Song {i}') for i in range(10)]
        
        with patch('app.routes.playlist_routes.serialize_song') as mock_serialize_song:
            mock_serialize_song.side_effect = lambda song: {'id': song.id, 'title': song.title}
            
            mock_get_all_songs.return_value = mock_paginated_songs
            response = client.get('/songs?page=1&per_page=10')
            assert response.status_code == 200
            data = response.json
            assert data['total'] == 100


def test_get_song_by_title(client):
    with patch('app.routes.playlist_routes.get_song_by_title') as mock_get_song_by_title, \
         patch('app.routes.playlist_routes.serialize_song') as mock_serialize_song:

        mock_song = MagicMock()
        mock_song.title = 'Test Song'
        mock_song.id = 1 

        mock_get_song_by_title.return_value = mock_song

        mock_serialize_song.return_value = {
            'title': 'Test Song',
            'id': 1
        }

        response = client.get('/songs/Test Song')
        assert response.status_code == 200
        data = response.json
        assert data['title'] == 'Test Song'
        assert data['id'] == 1


# Test for the case where song is not found by title
def test_get_song_by_title_not_found(client):
    with patch('app.services.playlist_service.get_song_by_title') as mock_get_song_by_title:
        mock_get_song_by_title.return_value = None

        response = client.get('/songs/Nonexistent Song')

        assert response.status_code == 404
        assert response.json == {"error": "Song not found"}

def test_update_song_rating(client):
    with patch('app.routes.playlist_routes.update_song_rating_by_id') as mock_update_song_rating, \
         patch('app.routes.playlist_routes.serialize_song') as mock_serialize_song:

        mock_updated_song = MagicMock()
        mock_updated_song.id = 1
        mock_updated_song.rating = 5.0
        mock_updated_song.title = "Test Song" 

        mock_update_song_rating.return_value = mock_updated_song

        mock_serialize_song.return_value = {
            'id': 1,
            'rating': 5.0,
            'title': "Test Song"
        }

        response = client.post('/songs/1/5.0')

        assert response.status_code == 200
        data = response.json
        assert data['rating'] == 5.0
        assert data['id'] == 1
        assert data['title'] == "Test Song"

def test_update_song_rating_invalid_input(client):
    response = client.post('/songs/1/None')
    assert response.status_code == 400
    assert response.json == {"error": "Invalid input. 'id' and 'rating' are required."}

# Test for the case where song is not found when updating rating
def test_update_song_rating_not_found(client):
    with patch('app.routes.playlist_routes.update_song_rating_by_id') as mock_update_song_rating:
        mock_update_song_rating.return_value = None

        response = client.post('/songs/999/5.0')

        assert response.status_code == 404
        assert response.json == {"error": "Song not found"}
