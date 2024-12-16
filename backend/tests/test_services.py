import pytest
from unittest.mock import MagicMock
from app.services.playlist_service import get_all_songs, get_song_by_title, update_song_rating_by_id, serialize_song
from app.models.songs import Song
from app.database import db
from app.app import create_app  


@pytest.fixture
def app():
    app = create_app()  # Create your Flask app here
    with app.app_context():
        yield app


# Mock the db and Song model for unit testing
@pytest.fixture
def mock_song():
    # Create a mock song object to be used in tests
    song = MagicMock(spec=Song)
    song.id = 1
    song.title = "Test Song"
    song.danceability = 0.7
    song.energy = 0.8
    song.mode = 1
    song.acousticness = 0.2
    song.tempo = 120
    song.duration_ms = 180000
    song.num_sections = 5
    song.num_segments = 10
    song.rating = 4.5
    return song


@pytest.fixture
def mock_db():
    # Mock db.session.commit and other db operations
    db.session.commit = MagicMock()
    db.session.rollback = MagicMock()
    return db


# Test get_all_songs function
def test_get_all_songs(app, mock_song, mock_db):
    mock_pagination = MagicMock()
    mock_pagination.items = [mock_song] 
    mock_pagination.total = 10
    mock_pagination.pages = 1
    Song.query.paginate = MagicMock(return_value=mock_pagination)

    with app.app_context():
        result = get_all_songs(1, 10)

    assert result is not None
    assert len(result.items) == 10  



# Test get_song_by_title function
def test_get_song_by_title(app, mock_song):
    # Mock the Song.query object and the filter_by method
    mock_query = MagicMock()
    Song.query = mock_query
    mock_filter = MagicMock()
    mock_query.filter_by.return_value = mock_filter  # Mock the return value of filter_by
    mock_filter.first.return_value = mock_song  # Mock the return value of first

    with app.app_context():
        result = get_song_by_title("Test Song")

    mock_query.filter_by.assert_called_once_with(title="Test Song")  # Assert the correct call
    mock_filter.first.assert_called_once()  # Assert that first() was called
    assert result is mock_song  # Ensure the result is the mocked song




# Test update_song_rating_by_id function
def test_update_song_rating_by_id(mock_song, mock_db):
    # Mock the Song.query.get method
    Song.query.get = MagicMock(return_value=mock_song)

    result = update_song_rating_by_id(1, 5.0)
    Song.query.get.assert_called_once_with(1)
    db.session.commit.assert_called_once()
    assert result.rating == 5.0


# Test update_song_rating_by_id when song not found
def test_update_song_rating_not_found(mock_db):
    # Mock the Song.query.get method to return None
    Song.query.get = MagicMock(return_value=None)

    result = update_song_rating_by_id(999, 5.0)
    Song.query.get.assert_called_once_with(999)
    db.session.commit.assert_not_called()
    assert result is None


# Test serialize_song function
def test_serialize_song(mock_song):
    result = serialize_song(mock_song)
    assert result['id'] == 1
    assert result['title'] == "Test Song"
    assert result['rating'] == 4.5
    assert 'duration_ms' in result  # Ensure all properties are serialized
