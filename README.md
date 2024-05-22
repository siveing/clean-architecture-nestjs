## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Migration

```bash
$ npm run typeorm_src migration:run
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## BIO
Keeping learning new thing and implement it, not only thought it goods but NO ACTION. 
Seem this structure change my mind too.
Good practice on something new at least, it gave ideas

## Reference
[Clean Architecture](https://medium.com/@chaewonkong/performance-disadvantages-of-clean-architecture-a-closer-look-1fe38362c74f) Pros and Cons of Clean Architecture

## MY Practice
- `Application`: The applications work as servcice and direct with repository by pasting the data to it, Such as MIDDLE WARE to paste action or not.
- `Domain`: This directory is used to manage the interfaces or we say it as TYPES manager to match with typescript  
- `Infrastructure`: Many things in this folder within config, entities, and repositories. Most initial work in here and continue add the entity and repository by the requirement of the works.
- `Presentation`: Seem we have work many project on NestJs, It is simple structure to manage one folder within controller, service, and module. BUT this manage only controller and we can import service to interact with DB via use case repository