// types/global.d.ts
export {};

// src/types/mindar.d.ts
// 이 파일은 MindAR의 전역 객체에 대한 타입을 정의합니다.
// TypeScript 컴파일러가 이 파일을 자동으로 인식하도록 src/ 디렉토리 안에 두는 것이 좋습니다.

declare global {
  type RequestType<T> = T extends (arg: infer R, ...args: any[]) => any
    ? R
    : never;

  type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}
