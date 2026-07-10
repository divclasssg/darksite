import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

vi.mock("@/globe/GlobeCanvas", () => ({
  GlobeCanvas: () => <div data-testid="globe-canvas" />
}));

describe("Home page", () => {
  it("renders the Darksite shell", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "Darksite" })).toBeInTheDocument();
    expect(screen.getByLabelText("촬영 계획")).toBeInTheDocument();
    expect(screen.getByTestId("globe-canvas")).toBeInTheDocument();
  });
});
