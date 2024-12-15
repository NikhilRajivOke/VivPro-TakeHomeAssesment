import { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

export const GetSong = ({ getSongHandler }) => {
  const [songTitle, setSongTitle] = useState("");
  const [clearbtn, setClearBtn] = useState(false);
  return (
    <>
      <TextField
        label="Search Song by Title"
        variant="outlined"
        value={songTitle}
        placeholder=" Type title to search"
        onChange={(e) => setSongTitle(e.target.value)} // Update title input
        sx={{ marginBottom: 2 }}
      />

      {!clearbtn && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            getSongHandler(songTitle);
            setClearBtn(true);
          }}
          disabled={!songTitle}
        >
          Get Song
        </Button>
      )}
      {clearbtn && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            getSongHandler("");
            setSongTitle("");
            setClearBtn(false);
          }}
        >
          clear
        </Button>
      )}
    </>
  );
};
