import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import { type JsonObject } from "@tldraw/tldraw";


export const whiteboardRouter = createTRPCRouter({


    create: protectedProcedure
        .input(z.object({ title: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {

            const result = await ctx.db.whiteboard.create({
                data: {
                    title: input.title,
                    userId: ctx.session.user.id,
                },
            });

        }),

    get: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.whiteboard.findUnique({
                where: { id: input.id },
            });
        }),

    getAll: protectedProcedure
        .query(async ({ ctx }) => {
            return await ctx.db.whiteboard.findMany();
        }),

    update: publicProcedure
        .input(z.object({ id: z.string(), content: z.unknown() }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.db.whiteboard.update({
                where: { id: input.id },
                data: {
                    content: input.content as JsonObject
                },
            });
        }),

    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.db.whiteboard.delete({
                where: {
                    id: input.id
                }
            });
        }),
})
