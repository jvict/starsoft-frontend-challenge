import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from "../../store";
import CartItem from "../CartItem";

const mockItem = {
  id: "1",
  name: "Produto Teste",
  price: 100,
  quantity: 2,
  image: "/test-image.jpg",
};

describe("CartItem", () => {
  test("renders item details correctly", () => {
    render(
      <Provider store={store}>
        <CartItem item={mockItem} />
      </Provider>
    );

    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
    expect(screen.getByText("100 ETH")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByAltText("Produto Teste")).toBeInTheDocument();
  });

  test("calls increaseQuantity action on '+' button click", () => {
    render(
      <Provider store={store}>
        <CartItem item={mockItem} />
      </Provider>
    );

    const increaseButton = screen.getByText("+");
    fireEvent.click(increaseButton);

  });

  test("calls removeItem action on delete button click", () => {
    render(
      <Provider store={store}>
        <CartItem item={mockItem} />
      </Provider>
    );

    const deleteButton = screen.getByAltText("Remover item");
    fireEvent.click(deleteButton);

  });
});