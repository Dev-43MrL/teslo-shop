import { FC, useReducer, useEffect } from "react";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number,
  subTotal: number,
  tax: number,
  total: number 
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0 
};

export const CartProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [];
      dispatch({ type: "[CART] - LoadCart from cookies | storage", payload: cookieProducts });
    } catch (error) {
      dispatch({ type: "[CART] - LoadCart from cookies | storage", payload: [] });
    }
  }, []);

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {

    const numberOfItems= state.cart.reduce(( prev, current ) => current.quantity + prev, 0);
    const subTotal= state.cart.reduce(( prev, current ) => ( current.price * current.quantity ) + prev, 0);
    const taxRate= Number( process.env.NEXT_PUBLIC_TAX_RATE || 0 );
    
    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * ( taxRate * 1 )
    }
    dispatch({ type: '[CART] - Update order summary', payload: orderSummary });

  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);

    if (!productInCart)
      return dispatch({
        type: "[CART] - Update products in cart",
        payload: [...state.cart, product],
      });

    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCartButDifferentSize)
      return dispatch({
        type: "[CART] - Update products in cart",
        payload: [...state.cart, product],
      });

    // Acumular
    const updateProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // Actuaizar la cantidad
      p.quantity += product.quantity;

      return p;
    });

    dispatch({ type: "[CART] - Update products in cart", payload: updateProducts });
  };

  const updateCartQuantity = ( product:ICartProduct ) => {
    dispatch({ type: '[CART] - Change cart quantity', payload: product })
  }

  const removeCartProduct = ( product:ICartProduct ) => {
    dispatch({ type: '[CART] - Remove cart product', payload: product })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
