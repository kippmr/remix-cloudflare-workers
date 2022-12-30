import { PrismaClient } from "@prisma/client/edge";

export default new PrismaClient({
  log: ["query"],
});
