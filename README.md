![example branch parameter](https://github.com/buravlev-arthur/games-selling-parser/actions/workflows/linting-and-testing.yml/badge.svg?branch=main)
[![Maintainability](https://api.codeclimate.com/v1/badges/e1e9fac7429fe32945dc/maintainability)](https://codeclimate.com/github/buravlev-arthur/games-selling-parser/maintainability)

# Парсер магазинов компьютерных игр

Собирает статистику предложений по продаже ключей и подарков (гифтов)для трех ключевых платформ: [Steam](https://store.steampowered.com/), [XBOX](https://www.xbox.com/) и [PlayStation](https://www.playstation.com/).

Парсер анализирует данные следующих магазинов:

- [GGSel](https://ggsel.net/)

Анализируются данные следующих игр:

- Diablo IV;
- Grand Theft Auto 5;
- Red Dead Redemtion 2;
- Minecraft;
- Cyberpunk 2077.

## Используемые технологии и библиотеки

Исполняемый код и тестирование: Bun, axios, knex, jsdom.

Форматирование и качество кода: ESLint, Prettier, Husky.

## Установка проекта

```bash
# клонирование репозитория (ssh-протокол)
git clone git@github.com:buravlev-arthur/games-selling-parser.git

# установка Bun, если его ещё нет
npm i -g bun

# установка проекта
cd games-selling-parser && bun i
```

Для подключения к базе данных (используется MySQL), необходимо в корне проекта создать файл `.env` и заполнить его следующим содержимым:

```text
DB_HOST="<ip or domain of mysql-server's host>"
DB_USER="<database user>"
DB_PASSWORD="<database password>"
DB_NAME="<database name>"
DB_PORT="<mysql-server's port>"
```

## Запуск парсера

```bash
# Однократный запуск парсера
bun run ./bin/index.ts

# Установка в pm2 с перезапуском парсера каждые 24 часа
export NPM_GLOBALS_PATH=$(npm root -g)/bun/bin/bun
pm2 start --name Games_selling_parser --interpreter $NPM_GLOBALS_PATH --restart-delay=86400000 ./bin/index.ts
```

## Тестирование

```bash
# прогон тестов
bun test

# покрытие кода
bun test:coverage
```
