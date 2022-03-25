interface Window {
  grecaptcha: {
    ready: (cb: () => void) => void;
    execute: (siteKey: string, action: Record<string, any>) => Promise<string>;
  };
}
