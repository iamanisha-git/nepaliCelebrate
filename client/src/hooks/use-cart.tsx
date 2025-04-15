import { createContext, ReactNode, useContext, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Event } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  event: Event;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (event: Event, quantity: number) => void;
  removeFromCart: (eventId: number) => void;
  updateQuantity: (eventId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (event: Event, quantity: number) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.event.id === event.id);
      
      if (existingItem) {
        return currentItems.map((item) =>
          item.event.id === event.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...currentItems, { event, quantity }];
    });

    toast({
      title: "Added to cart",
      description: `${event.title} has been added to your cart.`,
    });
  };

  const removeFromCart = (eventId: number) => {
    setItems((currentItems) => 
      currentItems.filter((item) => item.event.id !== eventId)
    );
  };

  const updateQuantity = (eventId: number, quantity: number) => {
    if (quantity < 1) return;
    
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.event.id === eventId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + Number(item.event.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
