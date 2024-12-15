import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Paper } from "@mui/material";
import { CustomToolbar } from "./CustomToolbar";
import { GetSong } from "./GetSong";

export const DashBoard = () => {
  const [gridState, setGridState] = useState({
    rowCount: 0,
    rows: [],
  });
  const [headerColumns, setHeaderColumns] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
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

  const processSongData = (songData) => {
    if (songData) {
      return {
        rowCount: 1,
        rows: [songData],
        columns: Object.keys(songData).map((key) => ({
          field: key,
          headerName: key.toUpperCase(),
          width: 175,
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

  const processPaginationData = (data) => {
    const columns = Object.keys(data.songs[0]).map((key) => ({
      field: key,
      headerName: key.toUpperCase(),
      width: 175,
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
    <>
      <Paper sx={{ width: "100%" }}>
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
          sx={{ border: 0 }}
        ></DataGrid>
      </Paper>
      <GetSong getSongHandler={handleGetSong} />
    </>
  );
};