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