import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Event } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export default function EventPage() {
  const [match, params] = useRoute("/event/:id");
  const [, setLocation] = useLocation();

  const { data: event, isLoading } = useQuery<Event>({
    queryKey: [`/api/events/${params?.id}`],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            <p className="text-gray-600 mb-6">{event.description}</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Location</h3>
                <p>{event.location}</p>
              </div>
              
              <div>
                <h3 className="font-semibold">Date</h3>
                <p>{event.date}</p>
              </div>
              
              <div>
                <h3 className="font-semibold">Price</h3>
                <p>NPR {event.price}</p>
              </div>
              
              <div>
                <h3 className="font-semibold">Capacity</h3>
                <p>{event.capacity} guests</p>
              </div>
            </div>
            
            <Button 
              className="w-full mt-8"
              onClick={() => setLocation(`/booking/${event.id}`)}
            >
              Book Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
