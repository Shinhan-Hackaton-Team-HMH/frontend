// types/global.d.ts
export {};

declare global {
  type RequestType<T> = T extends (arg: infer R, ...args: any[]) => any
    ? R
    : never;

  type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
}
