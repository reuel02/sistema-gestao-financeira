import { Usuario } from "@prisma/client"; 
declare global {
  namespace Express {
    export interface Request {
      user?: Usuario;
    }
  }
}