# Quick Overview
This project is separated into different modules. Each module has its own description, installation, and execution instructions.

This project is a web app. If you only want to run it, just follow the instructions under the section # Web. (You don't need to download any data as the processed data is already included in this repo.)

If you want to actually process the data, follow the instructions under the sections # Crime, # Food, and # Traffic. After which, you can run the web app.

# Web
`web` folder contains all the code for the web part of this project.

## IDE Setup
To open this project, you need [VSCode](https://code.visualstudio.com/). Please use VSCode's Open Folder functionality to open the `web` folder. Don't open the parent folder as that will not load the correct settings.

You also need to install VSCode extension [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode). This provides code formatting for the project.

## Running the project
To run the project, you need to install Node.js. The recommended way is to use a nvm (node version manager).

For Windows, use [nvm-windows](https://github.com/coreybutler/nvm-windows) and follow its instructions to install the latest version of Node.js.

For POSIX systems, use [nvm](https://github.com/nvm-sh/nvm) and follow its instructions instead.

Next, you need to install the dependencies:

```
npm install
```

Finally, you can run the project:

```
npm start
```

This will start a local server at http://localhost:1234. You can open this URL in your browser to view the website.

This should also support things like hot reloading, i.e. the web page will automatically reload when you make a change.

# Crime
This sections describes how to download and process the crime data.

## Downloading the data
The crime data is downloaded from [here](https://data.cityofnewyork.us/Public-Safety/NYC-crime/qb7u-rbmr). Please place it in the `crime` folder and name it `crimedata.csv`.

##

