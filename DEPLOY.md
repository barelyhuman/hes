# Deploy

We tried to keep deployments as simple as possible, without adding too much
thinking to how to handle it.

If you work with server services that handle deployments for you, you can just
hand them the `docker-compose.yml` file.

These are specific steps to deploy this on a compute instance like AWS EC2 or
Google Cloud Compute instances.

## First Setup

1. SSH onto the server and add in your key to the GCP portal or use the provided
   cert from EC2 based on whatever provider you are working with.

2. Generate a key on the server

```ssh
ssh-keygen # follow the prompts till you have a new key
```

3. Copy the above generated key and put it in **Deploy Keys** in Github / Gitlab
   , where ever your source code is hosted.

4. Clone the repo on the server

```sh
mkdir -p /var/www

# replace `<app>` with the name of the your app
# and `git@github:owner/repo.git` with the ssh path to the repo from your git provider
git clone git@github:owner/repo.git  /var/www/<app>
```

5. Follow steps from the [WORKFLOW.md](WORKFLOW.md) to setup the environment for
   the app on the server, which might involve installing docker and node and
   nginx to act as the reverse proxy for docker

6. Once the above is setup you can soft link the provided `nginx` config in the
   codebase to the nginx configurations on the server
   ```sh
   ln -sf /var/www/app/etc/nginx/sites-enabled/api.example.com.conf /etc/nginx/sites-enabled/api.yourappname.com
   ```

This will make it easy for you to locally hack onto the config and just updating
the deployed app will update the nginx configuration.

## Updating Deployments

The entire setup depends on `git` to be the manager for versions for stuff like
updating and rollback. You can modify the `Makefile` on your local and trigger
the `update` script on the server as needed. Examples for these are already in
the `Makefile`

The `update` script will allow you do deploy the latest version and restart the
server. You can specify which version to deploy by specifying the git tag to
use.

```sh
# if running on the server
./update v0.0.1
# or
./update v0.0.1 restart

# if running from your local system
ssh user@server.com:/var/www/app/update noop v0.0.1
# or
ssh user@server.com:/var/www/app/update restart v0.0.1
```
