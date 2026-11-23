declare global {
 interface Window {
  finishLoader?: () => void;
  __ld?: {p:number;done:boolean};
 }
}
export {};
