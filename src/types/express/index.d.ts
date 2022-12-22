// declare namespace Express {
//   export interface Request {
//     auth?: {
//       email: string;
//       id: number;
//     };
//   }
// }

// to make the file a module and avoid the TypeScript error
export {};

declare module "express-serve-static-core" {
  export interface Request {
    auth?: {
      email: string;
      id: number;
    };
  }
}
// declare global {
//   namespace Express {
//     export interface Request {
//       auth?: {
//         email: string;
//         id: number;
//       };
//     }
//   }
// }
