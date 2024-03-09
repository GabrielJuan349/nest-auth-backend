# Auth Backend in Nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Commands for init

```bash
# Levantar base de datos
$ docker compose up -d
```

Copiar el ```.env.template``` y renombrarlo a ```.env```

```bash
# Y para levantar el servidor necesitaras uno de los 4 comandos a continuacion

$ npm run start
$ npm run start:dev
$ nest start
$ nest start --watch
```
Si quieres que lo haga todo con un colo comando
```bash
# levanta el docker i ademas levanta el servidor de Nest
$ npm run start:new
```

## Production sides

Puedes tener tu Backend de Nest y tu Base de Datos de MongoDB: [Railway](https://railway.app)

Puedes tener tu base de datos en la nube: [MongoDB Atlas](https://www.mongodb.com/atlas)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
