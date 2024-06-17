// api endpoint for querying multiple boards

import { v } from "convex/values"

import { query } from "./_generated/server"

export const get = query({
    args: {
        orgId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        // fetch all boards
        const boards = await ctx.db
            .query("boards")
            // by_org is the query we gave in schema.ts for faster querying
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
            .order("desc")
            .collect();
        // q.eq checks if the query is matched

        return boards;
    }
})