// new api endpoint

import { v } from "convex/values"

import { mutation } from "./_generated/server"

// placeholder images for boards
const images = [
    "/placeholders/1.svg",
    "/placeholders/2.svg",
    "/placeholders/3.svg",
    "/placeholders/4.svg",
    "/placeholders/5.svg",
    "/placeholders/6.svg",
    "/placeholders/7.svg",
    "/placeholders/8.svg",
    "/placeholders/9.svg",
    "/placeholders/10.svg",
]

export const create = mutation({
    // args are something that we are expecting when we create a document (board in this case)
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    // ctx = context, args = arguments
    handler: async (ctx, args) => {
        // retrieves user identity
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];

        // inserts to database
        // ctx.db.insert(table, data)
        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage,
        })

        return board;
    }
})

export const remove = mutation({
    args: { id: v.id("boards") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        // TODO: check to delete favourite board relation as well

        await ctx.db.delete(args.id);
    }
})

export const update = mutation({
    args: {
        id: v.id("boards"),
        title: v.string()
    },
    handler: async (ctx, args) => {
        const title = args.title.trim();
        const identity = ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        if (!title) {
            throw new Error("Title is required");
        }

        if (title.length > 50) {
            throw new Error("Title cannot be longer than 50 characters")
        }

        const board = await ctx.db.patch(args.id, {
            title: args.title,
        })

        return board;
    }
})