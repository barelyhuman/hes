# Workflow

- [Setup](#setup)
- [Further Development](#further-development)
  - [Adding Migrations / Tables](#adding-migrations--tables)
  - [Adding New Services](#adding-new-services)
  - [Healthcheck](#healthcheck)
  - [NGINX Loadbalancing](#nginx-loadbalancing)

## Getting Started

**Prerequsites**

1. NodeJS >=14 ( preferrably installed with nvm )
2. Docker and Docker Compose
3. A little knowledge of how graphql works

### Setup

The initial setup is just going to be installing the node deps for the REST
server which can be done by the following commands

```sh
# execute this if you are using nvm
nvm use

# make sure you have yarn installed
npm i -g yarn

# install base deps
yarn install --frozen-lockfile
```

Then you can just stand up the compose file and you should have the hasura and
express server running on `localhost:3000`

This can be done using the following commands

```sh
# copy the base setup variables, you can modify these
# to your liking **when starting**
cp .env.example .env

# copy the base setup for hasura console, you'll have to
# modify these to match your .env settings for hasura or
# any changes you make in docker compose
cp ./hasura/config.example.yml ./hasura/config.yml

# to run in the foreground
docker compose up

# to run in the background
docker compose up -d
docker compose logs -f # to show the logs in follow mode
```

### Further Development

In most cases you were sent to this doc by a senior dev who's already setup
everything and you just need to fix something but if you are someone trying to
add or remove things from the codebase here's how.

> **Note:** If you're cloning this template for the first time, make sure to
> delete the `hasura/migrations` folder and the `hasura/metadata` folder then
> clean everything up on the server by running
>
> ```sh
> ./configure migration destroy
> ./configure metadata destroy
> ```

#### Adding Migrations / Tables

The CRUD GraphQL API are generated for you by Hasura, so all you need to do is
create tables with the Hasura console and you will be good to go.

Though, just running hasura from the docker will not show you the console, you
can run the console by running the following command in the root folder.

```sh
yarn hasura:console
```

This will open your default browser with the hasura console, you can then enter
your admin password which you can find in the `.env` file, hopefully you've
changed it to something a little more secure than the default one.

At this point, you can now add new tables and define their schema using the
**DATA** tab. And if you'll check your codebase, a new `migrations` folder and
`metadata` will be there with the modifications you've made to the table on the
console.

The remaining is basically everything you'd read at hasura's official docs.

You can use the `./configure` script to run basic commands of hasura

#### Adding New Services

These **services** could be anything from email dispatchers to a remote redis
service, make sure you add in the configuration right beside the implementation
in the `server/services/<service>` folder.

For a quick example checkout the `storage` service definition. This is done to
make sure the config for everything resides with it and easier to find when
needed.

> **Note**: This is an opinionated setup and you can modify these as needed but
> the source code is built around this.

Also, make sure your service always handles things that could change over
environments properly.

**Example**: We use AWS S3 for production file storage and `local` file storage
during development and a MinIO file storage (based of s3 object storage) on the
staging environment so the `storage` service respects the configuration being
picked based on the environment setup.

#### Healthcheck

You can hit a `GET` request on the following url's to check if the servers are
up

```
http://localhost:3000/healthz # hasura is up
http://localhost:3000/rest/v1/ping # webhook server is up
```

#### NGINX Loadbalancing

You can modify the nginx service running inside the docker by modifying the file
`docker/nginx.conf`, this file is being used to unify the port that is exposed
out on the host and also handles passive load balancing the server if you use
the `deploy.replicas` property in the `docker-compose.yml`
