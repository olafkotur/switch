## Switch
Monorepo for all Switch related projects, currently consists of: an API, the application and the website.

### API './api/'
#### Setup
* Run `yarn` to install dependencies
* Run `yarn mongo:dev:start` to start the local database in background
* Run `yarn mongo:dev:stop` to stop the local database (when finished)
* Run `yarn start` to start the API server

### App './app/'
#### Setup
* Run `yarn` to install dependencies
* Run `yarn start` to start the application
* Run `yarn dev:electron` to start the electron app in development mode (optional)
* Run `yarn dev:react` to start the react app in development mode (optional)

#### Publishing
* Update the version in `app/package.json`
* Run `yarn package` to create a package for publishing
* Create a new release in [olafkotur/switch-releases](https://github.com/olafkotur/switch-releases/releases) repository
* Update [release file](https://github.com/olafkotur/switch-releases/blob/master/release.json) with the latest version info
* Update [updates file](https://github.com/olafkotur/switch-releases/blob/master/updates.json) with the latest version info
* Automatic updates will be rolled out to all users

### Website './website/'
#### Setup
* Run `yarn` to install dependencies
* Run `yarn start` to start the website locally
* Updates are pushed automatically from `master` branch
