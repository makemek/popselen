# Pop Selen
Like [Popcat](https://popcat.click), but [Selen Tatsuki](https://www.nijisanji.jp/members/selen-tatsuki?filter=NIJISANJI%20EN) edition.

## Installation
Run docker compose to setup a redis database.
```
docker-compose up -d
```
You can optionally pass `REDIS_PASSWORD` environment variable to docker compose to create a database password.

In `api` package, copy `.env.example` to `.env`

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
- NextJS
- NestJS
- Redis