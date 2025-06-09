---
title: Setting up icloudpd on Synology NAS
date: 2024-11-12
type: Post
description: In this article I document how I setup backups for iCloud library in a Synology NAS.
published: true
---
*Last Updated on 12/11/2024*

In this article I document how I setup backups for iCloud library in a Synology NAS (ds923+ to be precise).

Out of all the solutions out there, I opted to have a copy in my NAS rather than moving everything to it. And I wanted a way that needs minimal recurring effort. So went with `icloudpd` docker container which would directly download stuff from iCloud. I don't have to keep originals on my phone and wait to get home to have the backed up.

This was a lot figure out.

The repo - https://github.com/boredazfcuk/docker-icloudpd

### Setting up the filesystem
Initially, we need to create 2 directories. One for the container settings and one for the location of downloads.

In `/docker`, the default directory `Container Manager` creates, I create `icloudpd/config` directory so that the container can create the settings.

For the download path, I use `volume1/homes/<user>/Photos/icloud` so `Synology Photos` has access to the downloaded media.

### Setting up the docker image
We need to create a new project with the path as the `/docker/icloudpd` and the following docker-compose

```yml
version: '3.3'
services:
    icloudpd:
        container_name: icloudpd
        restart: always
        environment:
            - user=username
            - user_id=1026 # default
            - group=users # default
            - group_id=100 #default
            - apple_id=apple-user@icloud.com
            - authentication_type=2FA
            - 'folder_structure={:%Y/%m}'
            - notification_days=3
            - synchronisation_interval=21600
            - TZ=Asia/Calcutta
            - 'download_path=/icloud'
            - skip_check=false
        network_mode: host
        healthcheck:
            test: ["CMD", "/usr/local/bin/healthcheck.sh"]
            interval: 10m
            timeout: 10s
            retries: 3
            start_period: 2m
        volumes:
            - '/volume1/docker/icloudpd/config:/config'
            - '/volume1/homes/user/Photos/icloud:/icloud'
        image: boredazfcuk/icloudpd:latest
```

Figuring out `user_id` and group details was a chore. It would not get proper permissions to download without this. After some debugging here's what worked

- SSH into your NAS
- Run `id username`

As soon as, you setup the docker container, you would need to setup a few things like the failsafe file and authentication. This was convenient to setup from the terminal as I was ssh-ed into it already.

- SSH into your NAS (if you already haven't)
- `touch <download-path>/.mounted` - this is the failsafe file
- `docker exec -it icloudpd sync-icloud.sh --Initialise` - this would initiate the iCloud authentication

Ran into few issues and one of the error messages suggested I login in icloud.com and see if there are any popups on screen. After clicking them away and re-running the container, it seems to download the icloud library.