<p align="center">
  <a href="https://switchapp.dev.com">
    <img width="150px" style="margin-top: 30px" src="https://github.com/olafkotur/switch/blob/main/app/assets/switch-icon.png?raw=true">
  </a>
</p>

<h1 align="center">Switch</h1>

<div align="center">

Lightweight overlay browser

![api-build](https://github.com/olafkotur/switch/actions/workflows/api-build.yml/badge.svg)
![app-build](https://github.com/olafkotur/switch/actions/workflows/app-build.yml/badge.svg)
![site-build](https://github.com/olafkotur/switch/actions/workflows/site-build.yml/badge.svg)

</div>

https://user-images.githubusercontent.com/24353005/175253078-cce3c954-b440-4baa-880d-d92f0f8fb394.mp4

## 👋🏽 About

_Switch started off as a very small project I created for myself to improve my workflow. Overtime I noticed other people enjoyed to use it too so I made some improvements to make it worthy and public. I would appreciate any feedback you may have on this project._

#### What does it do?

This is a simple lightweight browser and can be summoned over any existing application. It's designed to help you quickly interact with your favourite applications without losing focus.

My use case started with just wanting to check my [Notion](https://notion.so) notes during development. I then realised I use for so much more including `Discord` `Github` and `Twitter`. You can add most `webapps` of your choice to the Switch browser.

## ⬇️ Download

- Only available on `macOS` (Intel & Apple Silicon)
- Head over to the [releases](https://github.com/olafkotur/switch/releases) and download the latest `.dmg` file
- You'll receive auto-updates so you only need to do this once
- **Switch is currently invite-only, reach out to a code owner if you'd like a code, otherwise feel free to spin-up a local instance**

## 🔨 Setup

_This repo contains both the `api` and `app`, make sure you're in the correct directory._

> **Note**
> You will need a .env configuration to setup this project, please reach out for details.

<br />

**To setup the `./api`, follow the below instructions:**

- Start a mongodb server (instructions not included in this repo)
- Run `yarn` to install dependencies
- Run `yarn start` to start the API

**To setup the `./app`, follow the below instructions:**

- Run `yarn` to install dependencies
- Run `yarn start` to start the application

## 📦 Publishing

- Update the version in `app/package.json`
- Install Developer ID certificate and Provision Profile locally
- Ensure a provision profile exists at the root of this project `Switch.provisionprofile`
- Run `yarn package` to create a package for publishing
- Create a new release in [olafkotur/switch-releases](https://github.com/olafkotur/switch-releases/releases) repository
- Upload `.dmg` and `.zip` files from package output to the release
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

- Streaming services will not work due to additional licensing required to do so e.g. Netflix, Disney Plus
- Some `webapps` such as Whatsapp can sometimes break due to requiring a specific Chrome version

<br />

Built with ❤️ by Olaf Kotur
