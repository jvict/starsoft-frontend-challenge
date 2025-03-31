import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import OverlayCheckout from "../OverlayCheckout";

const mockClose = jest.fn();

describe("OverlayCheckout", () => {
  test("renders checkout overlay correctly", () => {
    render(
      <Provider store={store}>
        <OverlayCheckout isVisible={true} onClose={mockClose} />
      </Provider>
    );

    expect(screen.getByText("Mochila de Compras")).toBeInTheDocument();
    expect(screen.getByText("TOTAL")).toBeInTheDocument();
  });

  test("calls onClose when back button is clicked", () => {
    render(
      <Provider store={store}>
        <OverlayCheckout isVisible={true} onClose={mockClose} />
      </Provider>
    );

    const backButton = screen.getByRole("button", { name: /voltar/i });
    fireEvent.click(backButton);
    expect(mockClose).toHaveBeenCalled();
  });
});