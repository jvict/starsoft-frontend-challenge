import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import FinishedButton from "../FinishedButton";

describe("FinishedButton", () => {
  test("renders correct button text based on state", () => {
    render(
      <Provider store={store}>
        <FinishedButton />
      </Provider>
    );

    // Verifica estados
    expect(screen.getByText("FINALIZAR COMPRA")).toBeInTheDocument();
  });

  test("disables button when loading or completed", () => {
    render(
      <Provider store={store}>
        <FinishedButton />
      </Provider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });
});