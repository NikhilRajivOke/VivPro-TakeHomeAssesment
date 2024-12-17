import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DashBoard } from "./DashBoard";
import { useFetchSongs } from "../../customHooks/useFetchSongs";
import { usePagination } from "../../customHooks/usePagination";

jest.mock("../../customHooks/useFetchSongs");
jest.mock("../../customHooks/usePagination");

describe("DashBoard Component", () => {
  let mockUseFetchSongs;
  let mockUsePagination;

  beforeEach(() => {
    mockUseFetchSongs = useFetchSongs;
    mockUsePagination = usePagination;

    mockUsePagination.mockReturnValue({
      page: 0,
      pageSize: 10,
      handlePaginationChange: jest.fn(),
    });

    mockUseFetchSongs.mockReturnValue({
      gridState: {
        rows: [
          { title: "Song 1", danceability: 0.7, acousticness: 0.5, tempo: 120 },
          { title: "Song 2", danceability: 0.6, acousticness: 0.4, tempo: 110 },
        ],
        rowCount: 2,
      },
      headerColumns: [
        { field: "title", headerName: "Title", width: 200 },
        { field: "danceability", headerName: "Danceability", width: 150 },
      ],
      fetchPlaylist: jest.fn(),
    });
  });

  test("renders the dashboard layout", () => {
    render(<DashBoard />);

    expect(screen.getByText("Song 1")).toBeInTheDocument();
    expect(screen.getByText("Song 2")).toBeInTheDocument();
    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getByText("Danceability")).toBeInTheDocument();
  });

  test("fires search function when a song title is clicked", async () => {
    render(<DashBoard />);

    fireEvent.click(screen.getByText("Song 1"));

    await waitFor(() =>
      expect(mockUseFetchSongs().fetchPlaylist).toHaveBeenCalled()
    );
  });

  test("renders the SimpleScatterChart with correct data", () => {
    render(<DashBoard />);

    const scatterChart = screen.getByTestId("scatter-chart"); // Assuming you add a test ID in the component
    expect(scatterChart).toBeInTheDocument();
  });

  test("renders the SimpleBarChart with correct data", () => {
    render(<DashBoard />);

    const barChart = screen.getByTestId("bar-chart"); // Assuming you add a test ID in the component
    expect(barChart).toBeInTheDocument();
  });

  test("displays the correct pagination options", () => {
    render(<DashBoard />);

    const paginationOptions = screen.getByRole("combobox");
    expect(paginationOptions).toBeInTheDocument();
  });
});
