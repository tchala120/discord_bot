# Simple Economy Discord Bot

Economy Bot for check balance, give money and transfer. That's it so simple.

## Commands

- !balance, !bal => check balance.
- !give <user> <amount> => give money to specific user, ⛔ ADMIN ROLE CAN USE ⛔.
- !transfer <user> <amount> => transfer money to specific user.
- !help => show all commands and a little description.
- !clearchat => clear history message, ⛔ ADMIN ROLE CAN USE ⛔.

## Clone

```bash
git clone https://github.com/tchala120/discord_bot.git && cd discord_bot
```

## Install

```bash
yarn

yarn dev
```

## How to use

<h2>Database</h2>

- Create JSON file to root path with name is database/profiles.json

<h2>ENV</h2>

- Look for .env.example in your project and rename to .env
- Put your bot token to BOT_TOKEN variable.
- Put your owner role id to OWNER variable for check commands that only accept owner role only.

```
# Bot Token
BOT_TOKEN=<put-your-bot-token>

# Roles
OWNER=<put-your-owner-role-id-here>
```
