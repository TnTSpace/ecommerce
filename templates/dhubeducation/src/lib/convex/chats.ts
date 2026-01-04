import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { authGuard } from './utils'


export const createChat = mutation({
  args: {
    title: v.string(),
    userId: v.string()
  },
  handler: async (ctx, args) => {
    authGuard(args.userId)

    const chat = await ctx.db.insert("chats", {
      title: args.title,
      userId: args.userId,
      createdAt: Date.now()
    })

    return chat
  }
})

export const deleteChat = mutation({
  args: {
    id: v.id('chats'),
    userId: v.string()
  },
  handler: async (ctx, args) => {
    authGuard(args.userId)

    const chat = await ctx.db.get(args.id)

    if (!chat || chat.userId !== args.userId) {
      throw new Error("Unauthorized")
    }

    const messages = await ctx.db
    .query("messages")
    .withIndex("by_chat", q => q.eq("chatId", args.id))
    .collect()

    for (const message of messages) {
      await ctx.db.delete(message._id)
    }

    // Delete the chat
    await ctx.db.delete(args.id)
  }
})

export const listChats = query({
  args: {
    userId: v.string()
  },
  handler: async (ctx, args) => {
    authGuard(args.userId) 

    const chats = await ctx.db
    .query("chats")
    .withIndex("by_user", q => q.eq("userId", args.userId))
    .order("desc")
    .collect()

    return chats
  }
})