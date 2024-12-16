import { render, screen, fireEvent } from "@testing-library/react";
import { GetSong } from "./GetSong";

describe("GetSong Component", () => {
  const mockGetSongHandler = jest.fn();

  beforeEach(() => {
    mockGetSongHandler.mockClear();
  });

  test("renders Get Song button initially disabled", () => {
    render(<GetSong getSongHandler={mockGetSongHandler} />);

    const getSongButton = screen.getByRole("button", { name: /get song/i });

    expect(getSongButton).toBeDisabled();
  });

  test("enables Get Song button when text is entered", () => {
    render(<GetSong getSongHandler={mockGetSongHandler} />);

    const inputField = screen.getByPlaceholderText(/type title to search/i);
    fireEvent.change(inputField, { target: { value: "Test Song" } });

    const getSongButton = screen.getByRole("button", { name: /get song/i });
    expect(getSongButton).toBeEnabled();
  });

  test("calls getSongHandler with the correct song title when Get Song is clicked", () => {
    render(<GetSong getSongHandler={mockGetSongHandler} />);

    const inputField = screen.getByPlaceholderText(/type title to search/i);
    fireEvent.change(inputField, { target: { value: "Test Song" } });
    const getSongButton = screen.getByRole("button", { name: /get song/i });
    fireEvent.click(getSongButton);

    expect(mockGetSongHandler).toHaveBeenCalledWith("Test Song");
  });

  test("displays Clear button after Get Song button is clicked", () => {
    render(<GetSong getSongHandler={mockGetSongHandler} />);

    const inputField = screen.getByPlaceholderText(/type title to search/i);
    fireEvent.change(inputField, { target: { value: "Test Song" } });
    const getSongButton = screen.getByRole("button", { name: /get song/i });
    fireEvent.click(getSongButton);

    const clearButton = screen.getByRole("button", { name: /clear/i });
    expect(clearButton).toBeInTheDocument();
  });

  test("calls getSongHandler with an empty string and resets state when Clear button is clicked", () => {
    render(<GetSong getSongHandler={mockGetSongHandler} />);

    const inputField = screen.getByPlaceholderText(/type title to search/i);
    fireEvent.change(inputField, { target: { value: "Test Song" } });
    const getSongButton = screen.getByRole("button", { name: /get song/i });
    fireEvent.click(getSongButton);

    const clearButton = screen.getByRole("button", { name: /clear/i });
    fireEvent.click(clearButton);

    expect(mockGetSongHandler).toHaveBeenCalledWith("");
  });
});
