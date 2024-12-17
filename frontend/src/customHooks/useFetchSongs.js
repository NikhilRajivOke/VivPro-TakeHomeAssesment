import { useState } from "react";
import axios from "axios";
import { RatingInput } from "../components/Rating/Rating";

export const useFetchSongs = (page, pageSize, search) => {
  const [gridState, setGridState] = useState({ rowCount: 0, rows: [] });
  const [headerColumns, setHeaderColumns] = useState([]);

  const fetchSongs = async () => {
    try {
      let response;
      if (search) {
        response = await axios.get(`http://127.0.0.1:5000/songs/${search}`);
      } else {
        response = await axios.get("http://127.0.0.1:5000/songs", {
          params: { page, per_page: pageSize },
        });
      }

      const data = search
        ? processSongData(response.data)
        : processPaginationData(response.data);
      setGridState(data);
      setHeaderColumns(data.columns);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const processSongData = (songData) => {
    if (songData) {
      return {
        rowCount: 1,
        rows: [songData],
        columns: Object.keys(songData).map((key) => ({
          field: key,
          headerName: key.toUpperCase(),
          width: 175,
          renderCell: (params) => renderRatingInput(key, params),
        })),
      };
    }
    return { rowCount: 0, rows: [], columns: [] };
  };

  const processPaginationData = (data) => {
    const columns = Object.keys(data.songs[0]).map((key) => ({
      field: key,
      headerName: key.toUpperCase(),
      width: 175,
      renderCell: (params) => renderRatingInput(key, params),
    }));

    return { rowCount: data.total, rows: data.songs, columns };
  };

  const renderRatingInput = (key, params) => {
    if (key === "rating") {
      const ratingValue = params.row[key];
      return (
        <RatingInput
          name="rating"
          rating={ratingValue}
          onRatingChange={(newValue) =>
            handleRatingChange(newValue, params, key)
          }
        />
      );
    }
    return params.value;
  };

  const handleRatingChange = async (newValue, params) => {
    const { id } = params.row;

    try {
      const { data, status } = await axios.put(
        `http://127.0.0.1:5000/songs/${id}/${newValue}`
      );

      if (status === 200) {
        setGridState((prevState) => ({
          ...prevState,
          rows: prevState.rows.map((row) =>
            row.id === id ? { ...row, ...data } : row
          ),
        }));
      } else {
        console.error(
          "Failed to update the rating:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error updating the rating:", error.message);
    }
  };
  return { gridState, headerColumns, fetchPlaylist: fetchSongs };
};
