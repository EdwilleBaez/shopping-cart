import { Button } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { CartItemType } from "../App";
//styles
import { Wrapper } from "./CartItem.styles";

type Props ={
    item: CartItemType;
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id:number) => void;
    removeAll: (id:number) => void;
}

const CartItem: React.FC<Props> = ({ item, cartItems, addToCart, removeFromCart,  removeAll}) => (
    <Wrapper>
        <div>
            <h3>{item.title}</h3>
            <div className="information">
                <p>Price: ${item.price}</p>
                <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
            </div>
            <div className="buttons">
                <Button size="small" disableElevation variant="contained" onClick={() => removeFromCart(item.id)}> - </Button>
                <p>{item.amount}</p>
                <Button size="small" disableElevation variant="contained" onClick={() => addToCart(item)}> + </Button>
            </div>
        </div>
        <img src={item.image} alt={item.title}/>
        <Button className="button" title="Remove all items" disableElevation variant="contained" onClick={() => removeAll(item.id)}>{<DeleteOutlinedIcon className="icon"/>}</Button>
    </Wrapper>
);

export default CartItem;
