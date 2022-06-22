<p align="center">
  <a href="https://switchapp.dev.com">
    <img width="150px" style="margin-top: 30px" src="https://github.com/olafkotur/switch/blob/main/app/assets/switch-icon.png?raw=true">
  </a>
</p>

<h1 align="center">Switch</h1>

<div align="center">

Lightweight overlay browser

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

</div>

## 👋🏽 About

_Switch started off as a very small project I created for myself to improve my workflow. Overtime I noticed other people enjoyed to use it too so I made some improvements to make it worthy and public. I would appreciate any feedback you may have on this project._

#### What does it do?

This is a simple lightweight browser and can be summoned over any existing application. It's designed to help you quickly interact with your favourite applications without losing focus.

My use case started with just wanting to check my [Notion](https://notion.so) notes during development. I then realised I use for so much more including `Discord` `Github` and `Twitter`. You can add most `webapps` of your choice to the Switch browser.

## ⬇️ Download

- Only available on `macOS` for the time being
- Header over to the [releases](https://github.com/olafkotur/switch/releases) and download the latest `.dmg` file
- You'll receive auto-updates so you only need to do this once
- **Switch is currently invite-only, reach out to me if you'd like a code, otherwise feel free to spin-up a local instance**

## 🔨 Setup

_This repo contains both the `app` and `api`, make sure you're in the correct directory._

**To setup the `./app`, follow the below instructions:**

- Create a copy of `default.env` as `.env`
- Run `yarn` to install dependencies
- Run `yarn start` to start the application
- Run `yarn start:electron` to start electron only `optional`
- Run `yarn start:react` to start react front-end only `optional`
- Note the `app` will wait for the `api` to respond

**To setup the `./api`, follow the below instructions:**

- Start a mongodb server (instructions not included in this repo)
- Create a copy of `default.env` as `.env`
- Run `yarn` to install dependencies
- Run `yarn start` to start the API

## 📦 Publishing

- Update the version in `app/package.json`
- Run `yarn package` to create a package for publishing
- Create a new release in [olafkotur/switch-releases](https://github.com/olafkotur/switch-releases/releases) repository
- Update [release file](https://github.com/olafkotur/switch-releases/blob/master/release.json) with the latest version info
- Update [updates file](https://github.com/olafkotur/switch-releases/blob/master/updates.json) with the latest version info
- Automatic updates will be rolled out to all users

## 💻 Contributing

- You're more than welcome to submit a PR, follow the below rules before you do
- Setup your env in-line with the project guidelines _e.g. prettier_
- Ensure all commits have meaningful descriptions
- Branch name should follow the format of `fix/appropriate-title` `feat/appropriate-title` `chore/appropriate-title` etc...
- Create a PR against `main` branch and add an existing contributor as a reviewer
- PRs will be rejected if the above is not met

## ⚠️ Issues

- If you've found a bug or something isn't quite right, open an issue
- Be respectful, write as if you're the one reading
- Contributors will tackle the issue once enough information is provided

**Known Issues**

- Streaming services will not work in Switch due to additional licensing required to do so
- Some `webapps` such as Whatsapp can sometimes break due to requiring a specific Chrome version
