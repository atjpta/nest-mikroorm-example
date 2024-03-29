# Lib in project

## Lib in for nestjs

docs: https://docs.nestjs.com

```json
  @nestjs/common
  @nestjs/config
  @nestjs/core
  @nestjs/mapped-types
  @nestjs/platform-express
  @swc/cli
  @swc/core
  reflect-metadata
  class-transformer
  class-validator
  rxjs
```

## Lib for mikro-orm

docs: https://mikro-orm.io/docs/installation

```json
  @mikro-orm/cli
  @mikro-orm/core
  @mikro-orm/entity-generator
  @mikro-orm/migrations
  @mikro-orm/mysql
  @mikro-orm/nestjs
  @mikro-orm/reflection
  @mikro-orm/sql-highlighter
  @mikro-orm/seeder
```

## Engines

node 18

## Scripts

### Install lib

```bash
npm install
```

### Create .env

```bash
cp .env.example .env
```

### Create DB to last migration

```bash
npm run db:up
```

### Create DB in seeder

```bash
npm run db:seeder
```

### Reverse DB to migration before

```bash
npm run db:down
```

### Create migration

```bash
npm run db:create
```

### Run server dev

```bash
npm run dev
```

Application is running in http://[::1]:8600
#   n e s t - m i k r o o r m - e x a m p l e  
 