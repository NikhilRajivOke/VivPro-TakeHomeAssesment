import { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "./getsong.css";

export const GetSong = ({ getSongHandler }) => {
  const [songTitle, setSongTitle] = useState("");
  const [clearbtn, setClearBtn] = useState(false);

  const onButtonClicked = () => {
    getSongHandler(songTitle);
    setClearBtn(true);
  };

  const onClearBtnClicked = () => {
    getSongHandler("");
    setSongTitle("");
    setClearBtn(false);
  };

  return (
    <div className="songInput">
      <div className="textfield">
        <TextField
          label="Search Song by Title"
          variant="outlined"
          value={songTitle}
          placeholder=" Type title to search"
          onChange={(e) => setSongTitle(e.target.value)}
        />
      </div>
      {!clearbtn && (
        <Button
          variant="contained"
          color="primary"
          onClick={onButtonClicked}
          disabled={!songTitle}
          className="btn"
        >
          Get Song
        </Button>
      )}
      {clearbtn && (
        <Button
          variant="contained"
          color="primary"
          onClick={onClearBtnClicked}
          className="btn"
        >
          clear
        </Button>
      )}
    </div>
  );
};
