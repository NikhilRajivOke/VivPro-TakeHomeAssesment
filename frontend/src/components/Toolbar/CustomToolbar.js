import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { GetSong } from "../GetSong/GetSong";
import "./customtoolbar.css";


export const CustomToolbar = ({ handleGetSong }) => {
  return (
    <GridToolbarContainer className="toolbar">
      <GetSong getSongHandler={handleGetSong} />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};
