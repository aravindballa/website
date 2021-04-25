---
title: 'Advanced git tips'
date: '2018-09-23'
type: 'article'
description: 'Some of the advanced git usage and tips for the pros. Things that I have learnt over the years of using git at work.'
banner: 'git-330x478.png'
---

Git is amazing and you will learn only by using it. Try to learn the commands, you will forget if you don't use them. The same is the case for GUIs (like Tower or Source Tree). You might not have to learn the commands, but you will forget the process.

**The solution is very simple. Learn what you need. Google what you don't. Try remembering if you are googling the same thing often.** 😁

After using Git for more than 2 years and teaching it to people, there are few tip that I would like to share.

(I use command-line and not a GUI. I feel more comfortable like this.)

# Aliases

Git allows you to have aliases for commands, which we are long or are frequently-used. There will a `~/.gitconfig` file where you can specify them. (If you don't find the file, I think you can create it at HOME path).

These are the aliases I have.

```bash
[alias]
    pl = pull --rebase
    cm = commit -m
```

The most frequently used, as you can guess is `git cm`.

# Rebase

That leads us to the other alias that I have, `pull —rebase`. This is useful mostly when you work on open-source, or with a lot of branches in your projects. So you make a branch, add a new feature, or fix a bug and make a pull request. By the time you do this, you discover that the `master` was updated and has bunch of commits that are not in your branch.

In this scenario, —rebase allows you to replay your work on top of master, as if you have created the branch now. Dealing with merge conflicts is also easier this way. If there are any, you can fix them, and `git merge —continue` to continue the rebase of `—abort` to stop it. I use VS Code to fix the conflicts. Its pretty easy.

# Multiple SSH keys

What do you do when you have separate accounts for work and personal stuff? Ideally, you should not. The work ones will be private anyways. So maintain only one Github account. But imagine you have two.

I was like this for an year. And switching the accounts is time consuming and a pain if you do it frequently. SSH keys to the rescue! ✌🏻

You can generate multiple SSH keys with different mail ids(`id_rsa` and `id_rsa_work`) and register them with the Github accounts. When you are accessing the Github, you can give custom URLs for the remotes. For example,

```bash
git clone git@github.com-me:aravindballa/preact-ssr.git
git clone git@github.com-work:sencha/extjs-reactor.git
```

(P.S. Yes, I worked for Sencha for short period of time, on the [open-source tooling](http://docs.sencha.com/extjs/6.6.0/guides/getting_started/open_tooling.html) that they released in ExtJS 6.6. I no longer work for them.)

Notice `github.com-me` and `github.com-work`. These are Hostnames that we provide in the ssh config.

```bash
# ~/.ssh/config

Host github.com-me
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa

Host github.com-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_work
```

One thing, that you have to keep in mind, is the **Author**.

For the work repos, you will need to manually set the [user.email](http://user.email) to the work email.

```bash
git config user.email "aravind@awesome-company.com"
```

Or else, your commits at work will be by your personal account.

Peace out.
