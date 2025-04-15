declare module 'khalti-web' {
  interface KhaltiConfig {
    publicKey: string;
    productIdentity: string;
    productName: string;
    productUrl: string;
    amount: number;
    eventName?: string;
    onSuccess: (payload: any) => void;
    onError?: (error: any) => void;
    onClose?: () => void;
  }

  class KhaltiCheckout {
    constructor(config: KhaltiConfig);
    show({ amount }: { amount: number }): void;
  }

  export default KhaltiCheckout;
}
