import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, X } from "lucide-react";
import { useLocation } from "wouter";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const [, setLocation] = useLocation();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <Button onClick={() => setLocation("/")}>Browse Events</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.event.id}>
              <CardContent className="flex items-center gap-4 pt-6">
                <img
                  src={item.event.imageUrl}
                  alt={item.event.title}
                  className="w-24 h-24 object-cover rounded"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold">{item.event.title}</h3>
                  <p className="text-sm text-gray-600">{item.event.location}</p>
                  <p className="font-medium">NPR {item.event.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.event.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => 
                      updateQuantity(item.event.id, parseInt(e.target.value))
                    }
                    className="w-16 text-center"
                  />
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.event.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.event.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>NPR {total}</span>
              </div>
              
              <div className="flex justify-between font-bold text-lg pt-4 border-t">
                <span>Total</span>
                <span>NPR {total}</span>
              </div>
            </div>

            <Button className="w-full mt-6" onClick={() => setLocation("/checkout")}>
              Proceed to Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
