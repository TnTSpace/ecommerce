import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { authGuard } from './utils'


export const getLastMessage = query({
  args: {
    chatId: v.id("chats"),
    userId: v.string()
  },
  handler: async (ctx, args) => {
    authGuard(args.userId)

    const message = await ctx.db
    .query("messages")
    .withIndex("by_chat", q => q.eq("chatId", args.chatId))
    .order("desc")
    .first()

    return message
  }
})

export const list = query({
  args: {
    userId: v.string(),
    chatId: v.id("chats")
  },
  handler: async (ctx, args) => {
    authGuard(args.userId)

    const messages = await ctx.db
    .query("messages")
    .withIndex("by_chat", q => q.eq("chatId", args.chatId))
    .order("asc")
    .collect()

    return messages
  }
})

export const send = mutation({
  args: {
    chatId: v.id("chats"),
    content: v.string(),
    userId: v.string()
  },
  handler: async (ctx, args) => {
    authGuard(args.userId)
    const messageId = await ctx.db.insert("messages", {
      chatId: args.chatId,
      content: args.content.replace(/\n/g, "\\n"),
      role: "user",
      createdAt: Date.now()
    })

    return messageId
  }
})

export const store = mutation({
  args: {
    chatId: v.id("chats"),
    content: v.string(),
    userId: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant"))
  },
  handler: async (ctx, args) => {
    authGuard(args.userId)

    // store message with preserved newlines and html
    const messageId = await ctx.db.insert("messages", {
      chatId: args.chatId,
      content: args.content.replace(/\n/g, "\\n").replace(/\\/g, "\\\\"),
      role: args.role,
      createdAt: Date.now()
    })

    return messageId
  }
})