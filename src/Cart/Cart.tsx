import CartItem from "../CartItem/CartItem";
import { Button } from "@mui/material";

//types
import { CartItemType } from "../App";
//styles
import { Wrapper } from "./Cart.styles";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  removeAll: (id: number) => void;
  removeAllFromCart: () => void;
};

const Cart: React.FC<Props> = ({
  cartItems,
  addToCart,
  removeFromCart,
  removeAll,
  removeAllFromCart,
}) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          removeAll={removeAll}
          cartItems={cartItems}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      {cartItems.length ? (
        <Button
          className="button"
          size="small"
          disableElevation
          variant="contained"
          onClick={removeAllFromCart}
        >
          Remove all
        </Button>
      ) : null}
    </Wrapper>
  );
};

export default Cart;
