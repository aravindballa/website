---
title: Fine Tuning misconception
type: Memo
date: 2023-11-01
description: TL;DR - Fine tuning is not long term memory.
---
TL;DR - Fine tuning is not long term memory.

This might not come as a surprise for many but I learned this recently and it felt like a silly misconception I had.

This is how I discovered...

I was reading the book **The Courage to be Disliked** (see [highlights](https://aravindballa.com/bookshelf/the-courage-to-be-disliked-8783727/) from it). The format, which is like a conversation between a Philosopher and a person in their youth, felt good. It feels like we are talking to the Philosopher.

However, we could not ask questions or followups.

So I built [Philosopher Chat](https://philosopher-chat.vercel.app) which lets us talk to and extend conversations with the Philosopher.

I took the full text of the book, converted the conversations in it to JSON format, and fine tuned `gpt-3.5-turbo` on that.

Results were not as I expected.

![fine tuned conversation](https://ik.imagekit.io/aravindballa/website/convo-ft.jpeg)

It sure mimicked the style of the Philosopher, but not his memory.

For that, I had to add embeddings, which lets me search for previously had similar conversations, and provide that as context for the AI to reply.

![convo with memory](https://ik.imagekit.io/aravindballa/website/convo-memory.jpg)

Now, it works fairly well.

Why don't you give it a try? For starters, ask "How can one be happy". 😉