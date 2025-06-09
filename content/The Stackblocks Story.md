Like every techie on Twitter, I was also looking at a lot of people building side projects and making money from it. Not just making money, but also leaving jobs and going full time on the side projects. I was fascinated by the stories these people shared by building in public.

Quickly learnt that this isn't something that's done overnight. We have to put in the reps and when you are lucky enough the day will come.

In this post, I will try to articulate what was happening in my mind, small wins and struggles that I went while working on Stackblocks in the past couple of years.

Even though I had this dream of making money from side projects, Stackblocks didn't start as a serious app that would make any money. I was just solving a friend's problem.

## What was that problem

In the year 2020-2021, we all were home and forced to make friends online, in various communities and on social media due to the pandemic.

That was the time when people got into writing newsletters, building personal websites, making podcast etc, all of which helped create a persona on the Internet.

A friend of mine, Salman, who is now an author, had a newsletter on Substack. He also had a personal website where he was looking out for a way to embed what he published in his newsletter. He made a YouTube video casually talking through the process of how he came to the solution of taking a screenshot of the archive of Substack and putting that up on his website.

- [ ] update what Salman is doing now

- [ ] find that yt video salman made

I was watching that video one evening and I thought, "Hmm, there *should* be a better way."

Quickly an idea popped up.

In half hour, I made a prototype, that works just for him. Sent him a message about it and how to use it on his website. We were in different timezones so I know he would need some time to get back.

Hoping for a reply, I went to sleep.

The next morning, I woke up to see that he quickly started using it and also tweeted about it. There were a few others interested in this.

Seeing that, I added sign in, came up with a name and a logo, and built a small dashboard where people would add their newsletter, configure some settings, and get a code to embed the preview on their website.

I kept it simple and I wanted it to be a setup-and-forget type of tool. I don't need people returning to the dashboard unless what to change how the embed looks. Everything auto updates.

I tweeted when it was ready.

## Slowly, people start to use it

I don't remember many people using it as soon as I tweeted. But I reached out to a few people with newsletters to see if they would find this useful. And a few did.

I had a job, and was doing things like writing newsletter, podcasting etc, which took my time away. And honestly, I wasn't even taking Stackblocks seriously yet. I didn't think this was any revolutionary idea.

Couple of months later, I checked the DB status to see if I was still getting away with the free plan. And to my surprise, there were more than 30 signups.

Till this point, there was no logging, notifications or anything setup. So I wouldn't know if people were using it or not.

By now I knew I had take this up a bit seriously and a paywall soon. I could have added this earlier but I guess I was just lazy to code it up.

## SEO Efforts

I wanted Stackblocks to pop up when people are looking to embed their newsletter on any of the supported platforms. So I wrote a few guides on how to use this app to setup embeds on different website generators.

I had some experience working with SEO, specifically programmatic SEO, where you can show rich previews\*\* for your posts on Google. So I added those bits to the guides. I could have complete control over how the guides look and what markup they generate as I was writing the code for the blog from scratch.

- [ ] \*\* what is it called

That was the main reason to not to go with existing blogging platforms and do things on my own. If there is a change, or an exciting update in search engine optimization space, I want to be able to try it quickly.

And this was a major advantage when I added support to more platforms. I could write a script to generate a guide, for each platform, for every website generator. The steps, like logging in and adding your newsletter, were repeatable.

I added a tracker to see if they get any visits at all, and yes they did get some visits. Went with Plausible for the analytics\[^1\] at that point as I didn't want anything other than just the counts. Google Analytics seemed bloated and tracking too many unnecessary things.

## Finally adding the paywall

Now that I have the guides getting some hits, I randomly check how Stackblocks is performing again after a few days.

Oh boy, now it has 80+ signed up users.

And the embeds were getting lots of visits. This was a clear validation for the thing I built. I clearly knew I could charge for this.

I went with Paddle for the payment gateway as it gave less headaches for taxes. And a few people recommended it on Twitter. Quickly created some products in the Paddle dashboard and made the code changes to accept payments and shipped it with in a week.

I was too hesitant to tweet about this. Maybe it was a mental block. It felt weird, or maybe different, to charge people.

To my surprise, I got a payment. That too from Kenya. The cherry on top was that they found about the app from a guide that popped up when they searched for a solution.

I don't think I can put a word to the feeling of making magical internet money for the first time. It is magical. I remember smiling the whole day.

## Growing

I had the same mental block, which now sounds funny, for charging people what the software is worth.

I didn't have a paywall for long enough. Which means, even if people wouldn't pay, the app worked fine. I still got some payments which meant people were happy paying. But in my head, it felt rude to stop something that has been working well for people.

But then its not good for the app or the company to have so many users using things for free when its intended to be a paid one. The usage costs pile up some day. And when it does work as intended, you will have good serious users.

All the traffic, new signups, and new customer I have been getting till now is through SEO. Along with my friends Sreekar and Ekta, we are writing more content now. Eternally grateful to them.

I do have some plans on how market this and take is further as I am clearly not done here.

I have left out few parts as they would not fit the chronology or the post which is already getting bigger than I anticipated it to be. I have built the most part of this app publicly on Twitter. You can look at more stuff there using this search query: https://x.com/search?q=from%3Aaravindballa%20stackblocks&src=typed_query

## Take aways

I am really grateful that you have made it to the end of this long ramble. If not anything, I would like you to leave with these takeaways or learnings.

**For an idea to do well, it doesn't have to be revolutionary.** It just has to solve a problem. Bonus points if a lot of people have that problem.

### Footnotes

\[1\]: Made the switch to Umami now. Not just for Stackblocks pages but for all websites I have. It was easy to self host and the costs we way lower.