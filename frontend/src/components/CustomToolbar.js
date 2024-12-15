import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";

export const CustomToolbar = ({ handleGetSong }) => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};
