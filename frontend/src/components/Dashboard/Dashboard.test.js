import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DashBoard } from "./DashBoard";
import { useFetchSongs } from "../../customHooks/useFetchSongs";
import { usePagination } from "../../customHooks/usePagination";

// Mock custom hooks
jest.mock("../../customHooks/useFetchSongs");
jest.mock("../../customHooks/usePagination");

describe("DashBoard Component", () => {
  let mockUseFetchSongs;
  let mockUsePagination;

  beforeEach(() => {
    // Mock the custom hooks
    mockUseFetchSongs = useFetchSongs;
    mockUsePagination = usePagination;

    // Set up the mocks
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

    // Check for the presence of the charts and DataGrid
    expect(screen.getByText("Song 1")).toBeInTheDocument();
    expect(screen.getByText("Song 2")).toBeInTheDocument();
    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getByText("Danceability")).toBeInTheDocument();
  });

  test("fires search function when a song title is clicked", async () => {
    render(<DashBoard />);

    // Simulate clicking a song title
    fireEvent.click(screen.getByText("Song 1"));

    // Ensure the fetchPlaylist function is called with the updated search
    await waitFor(() =>
      expect(mockUseFetchSongs().fetchPlaylist).toHaveBeenCalled()
    );
  });

  test("renders the SimpleScatterChart with correct data", () => {
    render(<DashBoard />);

    // Check if the SimpleScatterChart is rendered
    const scatterChart = screen.getByTestId("scatter-chart"); // Assuming you add a test ID in the component
    expect(scatterChart).toBeInTheDocument();
  });

  test("renders the SimpleBarChart with correct data", () => {
    render(<DashBoard />);

    // Check if the SimpleBarChart is rendered
    const barChart = screen.getByTestId("bar-chart"); // Assuming you add a test ID in the component
    expect(barChart).toBeInTheDocument();
  });

  test("displays the correct pagination options", () => {
    render(<DashBoard />);

    // Check for pagination options
    const paginationOptions = screen.getByRole("combobox");
    expect(paginationOptions).toBeInTheDocument();
  });
});
