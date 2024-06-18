// new api endpoint

import { v } from "convex/values"

import { mutation, query } from "./_generated/server"

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

        const userId = identity.subject;

        // finding if the board to be delete is in favourites
        const existingFavourite = await ctx.db
            .query("userFavourites")
            .withIndex("by_user_board", (q) =>
                q
                .eq("userId", userId)
                .eq("boardId", args.id)
            )
            .unique();

        if (existingFavourite) {
            await ctx.db.delete(existingFavourite._id);
        }

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

export const favourite = mutation({
    args: {
        id: v.id("boards"),
        orgId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        // because we passed that the id of board schema, we can just pass args.id
        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error("Board not found");
        }

        const userId = identity.subject;

        // check whether the selected board is already favourited
        const existingFavourite = await ctx.db
            .query("userFavourites")
            .withIndex("by_user_board", (q) =>
                q
                .eq("userId", userId)
                .eq("boardId", board._id)
            )
            .unique();

        if (existingFavourite) {
            throw new Error("Board already favouried");
        }

        await ctx.db.insert("userFavourites", {
            userId,
            boardId: board._id,
            orgId: args.orgId
        })

        return board;
    }
})

export const unfavourite = mutation({
    args: { id: v.id("boards") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        // because we passed that the id of board schema, we can just pass args.id
        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error("Board not found");
        }

        const userId = identity.subject;

        // check whether the selected board is already favourited
        const existingFavourite = await ctx.db
            .query("userFavourites")
            .withIndex("by_user_board", (q) =>
                q
                .eq("userId", userId)
                .eq("boardId", board._id)
            )
            .unique();

        if (!existingFavourite) {
            throw new Error("Favourited board not found");
        }

        await ctx.db.delete(existingFavourite._id);

        return board;
    }
})

export const get = query({
    args: {
        id: v.id("boards")
    },
    handler: async (ctx, args) => {
        // get the board
        const board = ctx.db.get(args.id);

        return board;
    }
})