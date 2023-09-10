<h1 align="center">Git Out Of Hours</h1>


> Seamlessly proxy local websites to view across other devices on same network

<p align="center">
<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/JohnAkerman/proxy-host">
  <a href="https://snyk.io/test/github/JohnAkerman/proxy-host"><img src="https://snyk.io/test/github/JohnAkerman/proxy-host/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/JohnAkerman/proxy-host" style="max-width:100%;"></a>
<img src="https://img.shields.io/github/languages/top/JohnAkerman/proxy-host" alt="Top Language" />
</p>

## Install

*Globally (recommended)*

```
npm i -g proxy-host
```

## Usage

After you've installed globally you will be able to run it as a CLI application using the command line `proxy-host` in your terminal.

## Project Options


Name | Default Value | Description
--- | --- | --- |
URL | N/A | The https URL location of the site you want to view
QR | true | Generate a PR code dispalyed in the terminal. Useful for mobile device  testing.
Local Overrides | false | Whether to inject CSS and JS into the page. Note you will need to add them into a `custom.css` and `custom.js` file located in the root of this npm package. 
Open Browser on host | false | Whether to open the website on the host in your default browser 
Sync Browser Actions | false | Whether to sync clicks, scroll position, and form submissions across devices
Save project | true | Whether to save the project settings to disk for later usage (recommended), will be asked to provide name

## Scenarios for use

### Viewing in-development sites
Proxy Host attempts to resolve the problem of needing to view an in-development website on a separate device that does not naturally have access. A such scenario is a .NET website ran through IIS, where the developer wishes to view the local development website on a mobile device such as an iPhone, allowing them to make changes and see the result in realtime on the device.

### Local Overrides
Need to hide a certain element when viewing a particular website on a mobile device? This can be achieved using the "Local Overides" feature, adding styles into "custom.css" will be injected into the bottom of the `<head>` element of the website.

## Future Plans
The following features are being considered for future development of this project:
- Editing existing project settings
- Customising the files used in Local Overrides to use files from the directory `proxy-host` is ran in.
- Multilingual support
- Ability to change port value proxy is run on per project
- Applying Network Throttling onto proxy site to simulate different network conditions
- Inject custom headers to server requests and responses
- Support for HTTP2
