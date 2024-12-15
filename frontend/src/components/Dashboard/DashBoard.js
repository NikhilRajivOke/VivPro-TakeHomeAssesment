import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Paper } from "@mui/material";
import { CustomToolbar } from "../Toolbar/CustomToolbar";
import { SimpleScatterChart } from "../../chartComponents/SimpleScatterChart";
import { SimpleBarChart } from "../../chartComponents/SimpleBarChart";
import { RatingInput } from "../Rating/Rating";

import "./dashboard.css";

export const DashBoard = () => {
  const [gridState, setGridState] = useState({
    rowCount: 0,
    rows: [],
  });
  const [headerColumns, setHeaderColumns] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const pageSizeOptions = [5, 10, 20, 50, 100];

  const fetchSongs = async (page, pageSize, search) => {
    try {
      if (search) {
        return await axios.get(`http://127.0.0.1:5000/songs/${search}`);
      } else {
        return await axios.get("http://127.0.0.1:5000/songs", {
          params: {
            page: page,
            per_page: pageSize,
          },
        });
      }
    } catch (err) {
      throw new Error("Failed to fetch songs!!" + err.msg);
    }
  };

  const handleRatingChange = async (newValue, params, columnName) => {
    const songId = params.row.id;

    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/songs/${songId}/${newValue}` // Updated endpoint with songId and new rating
      );

      if (response.status === 200) {
        const updatedRow = response.data;

        setGridState((prevState) => ({
          ...prevState,
          rows: prevState.rows.map((row) =>
            row.id === songId ? { ...row, ...updatedRow } : row
          ),
        }));
      } else {
        console.error(
          "Failed to update the rating:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error updating the rating:", error.message);
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
    } else {
      return {
        rowCount: 0,
        rows: [],
        columns: [],
      };
    }
  };

  const renderRatingInput = (key, params) => {
    if (key === "rating") {
      const ratingValue = params.row[key];
      if (!ratingValue) {
        return (
          <RatingInput
            name="rating"
            rating={ratingValue}
            onRatingChange={(newValue) =>
              handleRatingChange(newValue, params, key)
            }
          />
        );
      } else {
        return <RatingInput name="rating" rating={ratingValue} />;
      }
    }
    return params.value;
  };

  const processPaginationData = (data) => {
    const columns = Object.keys(data.songs[0]).map((key) => ({
      field: key,
      headerName: key.toUpperCase(),
      width: 175,
      renderCell: (params) => renderRatingInput(key, params),
    }));
    return {
      rowCount: data.total,
      rows: data.songs,
      columns,
    };
  };

  const fetchPlaylist = async () => {
    setLoading(true);
    try {
      const response = await fetchSongs(page, pageSize, search);
      const data = response.data;
      if (search) {
        const result = processSongData(data);
        setGridState(result);
        setHeaderColumns(result.columns);
      } else {
        const result = processPaginationData(data);
        setGridState((prev) => ({
          ...prev,
          rowCount: result.rowCount,
          rows: result.rows,
        }));
        setHeaderColumns(result.columns);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, [page, pageSize, search]);

  const handlePaginationModelChange = (paginationModel) => {
    console.log("paginationModel triggered", paginationModel);
    setPage(paginationModel.page);
    setPageSize(paginationModel.pageSize);
  };

  const handleGetSong = (title) => {
    setSearch(title);
    fetchPlaylist();
  };

  return (
    <div className="layout">
      <div className="grid-cell">
        <SimpleScatterChart
          danceabilityData={gridState.rows.map((row) => ({
            x: row.title,
            y: Number(row.danceability),
          }))}
        />
      </div>
      <Paper className="playlist-table">
        <DataGrid
          pagination
          paginationMode="server"
          loading={loading}
          rowCount={gridState.rowCount}
          page={page}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          rows={gridState.rows}
          columns={headerColumns}
          onPaginationModelChange={handlePaginationModelChange}
          slots={{
            toolbar: CustomToolbar,
          }}
          slotProps={{
            toolbar: { handleGetSong },
          }}
          sx={{ border: 0 }}
        ></DataGrid>
      </Paper>
      <div className="grid-cell">
        <SimpleBarChart
          data={gridState.rows.map((row) => ({
            title: row.title,
            acousticness: row.acousticness * 100,
            tempo: row.tempo,
          }))}
        />
      </div>
      <div className="grid-cell">
        <SimpleBarChart
          data={gridState.rows.map((row) => ({
            title: row.title,
            acousticness: row.acousticness * 100,
            tempo: row.tempo,
          }))}
        />
      </div>
    </div>
  );
};
