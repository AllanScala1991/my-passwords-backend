declare global {
    var prisma: PrismaClient;
}
import { PrismaClient } from "@prisma/client";
declare let prisma: PrismaClient;
export default prisma;
