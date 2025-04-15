import { Event } from "@shared/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ShoppingCart } from "lucide-react";
import { useLocation } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { useKhalti } from "@/hooks/use-khalti";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();
  const { initiatePayment } = useKhalti();

  const handlePayment = () => {
    initiatePayment({
      amount: Number(event.price),
      eventName: event.title,
      onSuccess: (payload) => {
        console.log("Payment successful", payload);
        // You can add additional logic here, like creating a booking
      },
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{event.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {event.location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2">
          {event.description}
        </p>
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          {event.date}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="font-semibold">NPR {event.price}</span>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => addToCart(event, 1)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button 
            size="sm"
            onClick={() => setLocation(`/event/${event.id}`)}
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handlePayment}
          >
            Pay with Khalti
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}