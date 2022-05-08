# Pop Selen
Like [Popcat](https://popcat.click), but [Selen Tatsuki](https://www.nijisanji.jp/members/selen-tatsuki?filter=NIJISANJI%20EN) edition.

## Installation
Run docker compose to setup a redis database.
```
cp docker/.env.example docker/.env
docker-compose -f docker/docker-compose.yml up -d
```
You can optionally pass `REDIS_PASSWORD` environment variable in `.env` to docker compose to create a database password.

In `api` and `web` package, copy `.env.example` to `.env`

Install packages
```
yarn
```

Start locally
```
yarn start
```

Navigate to `localhost:3000`

## Built with
- [Remix](https://remix.run/)
- [NestJS](https://nestjs.com/)
- [Redis](https://redis.io/)