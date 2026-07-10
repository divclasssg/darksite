import { fireEvent, render, screen } from "@testing-library/react";
import Home from "@/app/page";

vi.mock("@/globe/GlobeCanvas", () => ({
  GlobeCanvas: () => <div data-testid="globe-canvas" />
}));

describe("Home page", () => {
  it("renders the Darksite planning workspace", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "Darksite" })).toBeInTheDocument();
    expect(screen.getByLabelText("촬영 계획")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "추천 요약" })).toBeInTheDocument();
    expect(screen.getByLabelText("촬영 날짜")).toBeInTheDocument();
    expect(screen.getByText("2026-04-17")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "달" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "날씨" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "어두운 하늘" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("globe-canvas")).toBeInTheDocument();
  });

  it("lets the date scrubber and layer controls update the workspace state", () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText("촬영 날짜"), { target: { value: "22" } });
    fireEvent.click(screen.getByRole("button", { name: "날씨" }));

    expect(screen.getByText("2026-04-22")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "날씨" })).toHaveAttribute("aria-pressed", "false");
  });
});
