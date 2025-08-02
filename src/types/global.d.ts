// types/global.d.ts
export {};

declare global {
  interface Window {
    MINDAR: {
      IMAGE: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        MindARThree: any;
      };
    };
  }
}
