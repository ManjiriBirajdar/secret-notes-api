
# Description

API which supports a common CRUD pattern to encrypt and decrypt notes

Tech stack:

1. TypeScript

2. NestJS

3. MongoDB

4. Jest Testing Framework (in progress)

5. Encryption type : aes-256-gcm

6. Application is packaged in docker and can be deployed using docker-compose

7. Sample GitHub Actions

8. E2E Testing using Postman API platform

# Using Docker-Compose

There is a `docker-compose.yml` file for starting Docker.

`docker-compose up`

After running the sample, you can stop the Docker container with

`docker-compose down`

## E2E Testing using postman api platform

Import "secret-notes-api/test/SecretNote REST API - CRUD.postman_collection.json" in postman

Refer [Published documentation](https://documenter.getpostman.com/view/24107635/2sAXxV59ZP)


# Local Deployment : Compile and run the project

```bash

#installation
$ pnpm install

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- [NestJS Documentation : General](https://docs.nestjs.com)
- [NodeJS Documentation : Encryption](https://docs.nestjs.com/security/encryption-and-hashing)
- [NodeJS Documentation : CRUD Generator](https://docs.nestjs.com/recipes/crud-generator)
- [NodeJS Documentation : Crypto library](https://nodejs.org/api/crypto.html)
- [Selecting Encyption Mode](https://isuruka.medium.com/selecting-the-best-aes-block-cipher-mode-aes-gcm-vs-aes-cbc-ee3ebae173c)
- [AES Encryption](https://nordlayer.com/blog/aes-encryption/)
- [GitHub Actions](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions)


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
