import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render Weather Component", () => {
    render(<App />);
    expect(screen.getByText(/weather/i)).toBeInTheDocument();
  });
});
