import { render, screen, fireEvent } from "@testing-library/react";
import { CustomToolbar } from "./CustomToolbar";

jest.mock("@mui/x-data-grid", () => ({
  DataGrid: ({ children }) => <div>{children}</div>,
  GridToolbarContainer: ({ children }) => <div>{children}</div>,
  GridToolbarExport: () => <button>Export</button>,
}));

describe("CustomToolbar Component", () => {
  const mockHandleGetSong = jest.fn();

  beforeEach(() => {
    mockHandleGetSong.mockClear();
  });

  test("renders GetSong component inside CustomToolbar", () => {
    render(<CustomToolbar handleGetSong={mockHandleGetSong} />);

    const getSongInput = screen.getByPlaceholderText(/type title to search/i);
    expect(getSongInput).toBeInTheDocument();

    const getSongButton = screen.getByRole("button", { name: /get song/i });
    expect(getSongButton).toBeInTheDocument();
  });

  test("renders GridToolbarExport component inside CustomToolbar", () => {
    render(<CustomToolbar handleGetSong={mockHandleGetSong} />);
    const exportButton = screen.getByRole("button", { name: /export/i });
    expect(exportButton).toBeInTheDocument();
  });

  test("calls handleGetSong function when Get Song button is clicked", () => {
    render(<CustomToolbar handleGetSong={mockHandleGetSong} />);

    const inputField = screen.getByPlaceholderText(/type title to search/i);
    fireEvent.change(inputField, { target: { value: "Test Song" } });
    const getSongButton = screen.getByRole("button", { name: /get song/i });
    fireEvent.click(getSongButton);

    expect(mockHandleGetSong).toHaveBeenCalledWith("Test Song");
  });

  test("does not call handleGetSong when Get Song button is clicked with empty input", () => {
    render(<CustomToolbar handleGetSong={mockHandleGetSong} />);
    const getSongButton = screen.getByRole("button", { name: /get song/i });
    fireEvent.click(getSongButton);
    expect(mockHandleGetSong).not.toHaveBeenCalled();
  });
});
