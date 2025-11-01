import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

export function hashPasswordMiddleware() {
  //toDO : type params and next properly
  return async (params: any, next: any) => {
    if (params.model === "Student" || params.model === "Admin") {
      if (params.action === "create" || params.action === "update") {
        const data = params.args.data;
        if (data?.password) {
          const salt = await bcrypt.genSalt(10);
          data.password = await bcrypt.hash(data.password, salt);
        }
      }
    }
    return next(params);
  };
}
