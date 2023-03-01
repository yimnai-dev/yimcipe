declare module 'base64-img' {
  function base64Sync(path: string): string;
  function base64(path: string, callback: (err: any, data: string) => void): void;
}
