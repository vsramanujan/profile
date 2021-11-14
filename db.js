import { PrismaClient } from "@prisma/client";

export const prismaClient = global.prismaClient || new PrismaClient();

global.prismaClient = prismaClient;
