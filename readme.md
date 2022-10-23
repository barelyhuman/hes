# hes

> **h**asura + **e**xpress-**s**erver

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
