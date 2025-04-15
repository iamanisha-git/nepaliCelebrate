import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Event, insertBookingSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function BookingPage() {
  const [match, params] = useRoute("/booking/:id");
  const { toast } = useToast();

  const { data: event, isLoading } = useQuery<Event>({
    queryKey: [`/api/events/${params?.id}`],
  });

  const form = useForm({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      eventId: parseInt(params?.id || "0"),
      guestCount: 1,
      status: "pending",
      totalAmount: 0,
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/bookings", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Successful",
        description: "Your event has been booked successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
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

  const onSubmit = (data: any) => {
    bookingMutation.mutate({
      ...data,
      totalAmount: event.price * data.guestCount,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Book Event: {event.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="guestCount">Number of Guests</Label>
                <Input
                  id="guestCount"
                  type="number"
                  min="1"
                  max={event.capacity}
                  {...form.register("guestCount", { valueAsNumber: true })}
                />
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span>Price per guest</span>
                  <span>NPR {event.price}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total Amount</span>
                  <span>
                    NPR {event.price * (form.watch("guestCount") || 0)}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={bookingMutation.isPending}
              >
                {bookingMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
