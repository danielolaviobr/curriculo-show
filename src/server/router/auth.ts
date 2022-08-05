import { z } from "zod";
import * as trpc from "@trpc/server";
import { createRouter } from "./context";
import { hash } from "bcryptjs";

export const authRouter = createRouter().mutation("signup", {
  input: z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
  }),
  resolve: async ({ input, ctx }) => {
    const { name, email, password } = input;

    const exists = await ctx.prisma.user.findFirst({
      where: { email },
    });

    if (exists) {
      throw new trpc.TRPCError({
        code: "CONFLICT",
        message: "User already exists.",
      });
    }

    const hashedPassword = await hash(password, 10);

    const result = await ctx.prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return {
      status: 201,
      message: "Account created successfully",
      result: result.email,
    };
  },
});
