# hes

> **h**asura + **e**xpress-**s**erver

# What and Why ?

Unlike most of my projects this isn't on the minimal side of things but a
batteries included template for handling most common cases, this was done to
make sure the development and deployment could be done with the same workflow
and setup and modifications follow the [12 factor app](http://12factor.net)
setup, while specifying a set way on how to scale up and and handle more heavier
instances. Most of this is done using already battle-tested services like nginx
and pgbouncer while also using modern services to create something that can be
used to avoid glue code.

I have another version that uses Prisma to do something similar for a scratch
setup of GraphQL and that's also something you can use but that has a lot of
moving parts and I've realised that only someone who's worked with the codebase
enough would understand that one.

This on the other hand offloads most handling to Hasura for GraphQL and Express
for traditional REST style APIs even though the main reason for express to be in
the setup is for custom logic handling hasura and handling complex cases where a
REST API is absolutely necessary.

All this is served from a single url so the client side doesn't have to deal
with mutliple endpoints

> **Note**: I don't really recommend adding a database to the docker-compose
> setup but it's only for development for most production environments you'd use
> a managed database and make sure you change the environment variables to
> connect to those database, this is mostly needed for the pgbouncer setup as
> the server and hasura would just connect to pgbouncer

# Requirements to Cover

## Orchestration / Arch

- [x] Simple Orchestration (single docker-compose)
- [x] GraphQL (hasura)
- [x] Simple Update or server ( git pull on server or ssh remote exec)
- [x] Single URL for GraphQL and REST (internal nginx handles redirection to
      needed service)
- [x] load balancing for docker-compose `scale` or `deploy.replicas` (internal
      nginx)
- [x] Postgres connection pooling to avoid hasura and webhook connection issues
      ( pgbouncer )

## Services / Plugs

- [x] DB for Development ( internal postgres instance, customizable by .env )
- [x] File Storage example ( flydrive configured )
- [x] Uninterupted authentication example ( empty auth, no logic in place )
- [ ] Email Service example

# Docs

- [WORKFLOW.md](WORKFLOW.md)
- [DEPLOY.md](DEPLOY.md)
