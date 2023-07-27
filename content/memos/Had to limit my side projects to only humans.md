---
title: Had to limit my side projects to only humans
date: '2023-07-27'
type: 'Memo'
description: 'Story about how my side project got attacked'
---

I run a side-project called [Stackblocks](https://stackblocks.app).

It's a [rewarding](https://twitter.com/aravindballa/status/1562688753382019072) [experience](https://twitter.com/aravindballa/status/1542091942653472769). Well, most of the times. Sometimes it gets frustrating.

You get **attacked**. For trying to do something–build something–good.

Don't know why we humans are like that.

Recently someone, lets call them Hacker, did a DDoS attack on the app's login page. Which means, thousands of login attempts in a very short period. I send an email with login link when the user wants to login. So, **thousands of mails were sent**.

*6000 emails* were sent by the time I realized and decided to take action.

The limit I have is 1000 for a month. My account was flagged and the app's login was completely blocked. Even for genuine humans.

I tried putting a rate limit, which says one can try logging in only a few times in an hour. I thought I got rid of the issue.

![](https://pbs.twimg.com/media/FupSWSaWIAEtfyH?format=jpg&name=4096x4096)

But the Hacker found a way to bypass this, maybe some wait period in the script that delays the requests or retries if it fails, who knows. The attacked resumed.

*10,600 emails* sent. I had to find a way to stop.

Captcha to the rescue.

![stackblocks login with captcha](https://ik.imagekit.io/aravindballa/website/sb-captcha.jpg?updatedAt=1690481768306)

I added a check which asks "Are you a human?" before sending the email now.

Thankfully, that's a bit difficult to crack with a script.

This is how I kept robots at bay. From now on, every login page I build will have this check turned on.

If a robot is reading this, just know that we can still be friends.