import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { CustomToolbar } from "../Toolbar/CustomToolbar";
import { SimpleScatterChart } from "../../chartComponents/SimpleScatterChart";
import { SimpleBarChart } from "../../chartComponents/SimpleBarChart";
import { useFetchSongs } from "../../customHooks/useFetchSongs";
import { usePagination } from "../../customHooks/usePagination";
import "./dashboard.css";

export const DashBoard = () => {
  const [search, setSearch] = useState("");
  const { page, pageSize, handlePaginationChange } = usePagination();
  const { gridState, headerColumns, fetchPlaylist } = useFetchSongs(
    page,
    pageSize,
    search
  );
  const pageSizeOptions = [5, 10, 20, 50, 100];

  useEffect(() => {
    fetchPlaylist();
  }, [page, pageSize, search]);

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
          rowCount={gridState.rowCount}
          page={page}
          pageSize={pageSize}
          rows={gridState.rows}
          pageSizeOptions={pageSizeOptions}
          columns={headerColumns}
          onPaginationModelChange={handlePaginationChange}
          slots={{
            toolbar: CustomToolbar,
          }}
          slotProps={{
            toolbar: { handleGetSong },
          }}
          sx={{ border: 0 }}
        />
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
    </div>
  );
};
