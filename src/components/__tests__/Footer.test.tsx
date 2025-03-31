import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  test("renders footer text", () => {
    render(<Footer />);
    expect(
      screen.getByText("StarSoft © Todos os direitos reservados")
    ).toBeInTheDocument();
  });
});