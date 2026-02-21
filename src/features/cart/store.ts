"use client";

import { useState, useCallback, useEffect } from "react";

export interface CartItem {
  productId: string;
  quantity: number;
}

let cartItems: CartItem[] = [];
let listeners: (() => void)[] = [];

function emitChange() {
  listeners.forEach((l) => l());
}

export function useCart() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  const addToCart = useCallback((productId: string, quantity: number = 1) => {
    const existing = cartItems.find((item) => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cartItems.push({ productId, quantity });
    }
    emitChange();
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    cartItems = cartItems.filter((item) => item.productId !== productId);
    emitChange();
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      const item = cartItems.find((i) => i.productId === productId);
      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          removeFromCart(productId);
        }
        emitChange();
      }
    },
    [removeFromCart]
  );

  const getCartCount = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, []);

  return {
    items: cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
  };
}
