"use client";

import React, {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useCallback,
} from "react";
import type { Product } from "@/lib/data";

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

type CartAction =
    | { type: "ADD"; product: Product }
    | { type: "REMOVE"; id: string }
    | { type: "INCREMENT"; id: string }
    | { type: "DECREMENT"; id: string }
    | { type: "CLEAR" }
    | { type: "HYDRATE"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD": {
            const existing = state.items.find((i) => i.id === action.product.id);
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.id === action.product.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    ),
                };
            }
            return { items: [...state.items, { ...action.product, quantity: 1 }] };
        }
        case "REMOVE":
            return { items: state.items.filter((i) => i.id !== action.id) };
        case "INCREMENT":
            return {
                items: state.items.map((i) =>
                    i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
            };
        case "DECREMENT":
            return {
                items: state.items
                    .map((i) =>
                        i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
                    )
                    .filter((i) => i.quantity > 0),
            };
        case "CLEAR":
            return { items: [] };
        case "HYDRATE":
            return { items: action.items };
        default:
            return state;
    }
}

interface CartContextValue {
    items: CartItem[];
    totalItems: number;
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    increment: (id: string) => void;
    decrement: (id: string) => void;
    clearCart: () => void;
    isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem("mychoices-cart");
            if (stored) {
                const parsed: CartItem[] = JSON.parse(stored);
                dispatch({ type: "HYDRATE", items: parsed });
            }
        } catch {
            // ignore parse errors
        }
    }, []);

    // Persist to localStorage on every change
    useEffect(() => {
        try {
            localStorage.setItem("mychoices-cart", JSON.stringify(state.items));
        } catch {
            // ignore storage errors
        }
    }, [state.items]);

    const addToCart = useCallback(
        (product: Product) => dispatch({ type: "ADD", product }),
        []
    );
    const removeFromCart = useCallback(
        (id: string) => dispatch({ type: "REMOVE", id }),
        []
    );
    const increment = useCallback(
        (id: string) => dispatch({ type: "INCREMENT", id }),
        []
    );
    const decrement = useCallback(
        (id: string) => dispatch({ type: "DECREMENT", id }),
        []
    );
    const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
    const isInCart = useCallback(
        (id: string) => state.items.some((i) => i.id === id),
        [state.items]
    );

    const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                totalItems,
                addToCart,
                removeFromCart,
                increment,
                decrement,
                clearCart,
                isInCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextValue {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}
