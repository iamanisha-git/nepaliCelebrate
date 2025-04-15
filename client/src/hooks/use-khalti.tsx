import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import KhaltiCheckout from "khalti-web";

interface KhaltiConfig {
  publicKey: string;
  productIdentity: string;
  productName: string;
  productUrl: string;
  eventName: string;
  amount: number;
  onSuccess: (payload: any) => void;
  onError?: (error: any) => void;
}

export function useKhalti() {
  const { toast } = useToast();
  const { clearCart } = useCart();

  const initiatePayment = ({
    amount,
    eventName,
    onSuccess,
    onError
  }: Partial<KhaltiConfig>) => {
    const config = {
      publicKey: import.meta.env.VITE_KHALTI_PUBLIC_KEY,
      productIdentity: "nepal-events-1234",
      productName: "Nepal Events Booking",
      productUrl: window.location.origin,
      eventName,
      amount: amount! * 100, // Convert to paisa
      onSuccess: (payload: any) => {
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully.",
        });
        clearCart();
        onSuccess?.(payload);
      },
      onError: (error: any) => {
        toast({
          title: "Payment Failed",
          description: "There was an error processing your payment. Please try again.",
          variant: "destructive",
        });
        onError?.(error);
      },
      onClose: () => {
        toast({
          title: "Payment Cancelled",
          description: "You have cancelled the payment process.",
        });
      }
    };

    const checkout = new KhaltiCheckout(config);
    checkout.show({ amount: config.amount });
  };

  return { initiatePayment };
}
