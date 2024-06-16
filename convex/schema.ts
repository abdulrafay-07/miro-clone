import { v } from "convex/values"
import { defineSchema, defineTable } from "convex/server"

export default defineSchema({
    // schema
    boards: defineTable({
        // attributes?
        title: v.string(),
        orgId: v.string(),
        authorId: v.string(),
        authorName: v.string(),
        imageUrl: v.string(),
    })
    // faster querying - .index(name, field)
    .index("by_org", ["orgId"])
    // for searching
    .searchIndex("search_title", {
        searchField: "title",
        // filterFields is orgId because we will only search inside of a single organization
        filterFields: ["orgId"]
    })
})
