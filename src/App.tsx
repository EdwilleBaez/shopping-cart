import { useQuery } from 'react-query'
import { useState, useEffect } from 'react'

import Item from './Item/Item'
import Cart from './Cart/Cart'
import Drawer from '@mui/material/Drawer'
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Badge from '@mui/material/Badge'
import { Wrapper } from './Item/Item.styles'
//styles
import { StyledButton } from './App.styles'

//types
export type CartItemType = {
    id: number
    category: string
    description: string
    image: string
    price: number
    title: string
    amount: number
}

const setCartToLocalStorage = (cart: CartItemType[]): void => {
    localStorage.setItem('cart', JSON.stringify(cart))
}

const getCartFromLocalStorage = (): CartItemType[] => {
    const cartData = localStorage.getItem('cart')
    return cartData ? JSON.parse(cartData) : []
}

const getProducts = async (): Promise<CartItemType[]> => {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    return data as CartItemType[]
}

function App() {
    const { data, isLoading, error } = useQuery<CartItemType[]>(
        'products',
        getProducts
    )

    const [cartOpen, setCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState<CartItemType[]>(
        getCartFromLocalStorage
    )

    useEffect(() => {
        // Guardar el carrito en localStorage cada vez que cambia
        setCartToLocalStorage(cartItems)
    }, [cartItems])

    const getTotalItems = (items: CartItemType[]) =>
        items.reduce((acc: number, item) => acc + item.amount, 0)

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems((prev) => {
            //1. el item ya ha sido agregado al carrito?
            const isItemInCart = prev.find((item) => item.id === clickedItem.id)

            if (isItemInCart) {
                return prev.map((item) =>
                    item.id === clickedItem.id
                        ? { ...item, amount: item.amount + 1 }
                        : item
                )
            }
            //2. Primera vez que el item es agregado al carrito
            return [...prev, { ...clickedItem, amount: 1 }]
        })
    }

    const handleRemoveFromCart = (id: number) => {
        setCartItems((prev) =>
            prev.reduce((acc, item) => {
                if (item.id === id) {
                    if (item.amount === 1) return acc
                    return [...acc, { ...item, amount: item.amount - 1 }]
                } else {
                    return [...acc, item]
                }
            }, [] as CartItemType[])
        )
    }

    const handleRemoveAllItems = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id))
    }

    const handleRemoveAllFromCart = () => {
		console.log('remove')
        setCartItems([])
    }

    if (isLoading) return <LinearProgress />
    if (error) return <div>Something went wrong ...</div>

    return (
        <Wrapper>
            <Drawer
                anchor="right"
                open={cartOpen}
                onClose={() => setCartOpen(false)}
            >
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                    removeAll={handleRemoveAllItems}
                    removeAllFromCart={handleRemoveAllFromCart}
                />
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                    <AddShoppingCartIcon />
                </Badge>
            </StyledButton>
            <Grid container>
                {data?.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} lg={4}>
                        <Item item={item} handleAddToCart={handleAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    )
}

export default App
