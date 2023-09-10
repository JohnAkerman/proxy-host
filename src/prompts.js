// Determine whether we should be loading the project from disk or if its new
const existingProjectPrompt = {
    type: 'confirm',
    name: 'existingProject',
    message: 'Is this an existing project?',
    choices: [
        {
            key: 'y',
            name: 'yes',
            value: true,
        },
        {
            key: 'n',
            name: 'no',
            value: false,
        }
    ],
    default: true,
}

// If we are creating a new project, obtain all the info we need for a project
const newProjectPrompt = [
    {
        type: 'input',
        name: 'url',
        message: 'What\'s the projects URL?',
        validate(input) {
            const regexStr = /^https:\/\//g;
            if (regexStr.exec(input) !== null) {
                return true;
            } else {
                throw Error('URL has to start with \`https://\`');
            }
        }
    },
    {
        type: 'confirm',
        name: 'qr',
        message: 'Do you want a QR code with the URL?',
        choices: [
            {
                key: 'y',
                name: 'yes',
                value: true,
            },
            {
                key: 'n',
                name: 'no',
                value: false,
            }
        ],
        default: true,

    },
    {
        type: 'confirm',
        name: 'openBrowser',
        message: 'Do you want to open the URL in a new browser tab?',
        choices: [
            {
                key: 'y',
                name: 'yes',
                value: true,
            },
            {
                key: 'n',
                name: 'no',
                value: false,
            }
        ],
        default: false,
    },
    {
        type: 'confirm',
        name: 'syncBrowserActions',
        message: 'Do you want to sync browser actions such as clicks, scroll and form submissions?',
        choices: [
            {
                key: 'y',
                name: 'yes',
                value: true,
            },
            {
                key: 'n',
                name: 'no',
                value: false,
            }
        ],
        default: true,
    },
    {
        type: 'confirm',
        name: 'overrides',
        message: 'Do you want to use custom.css/.js override files?',
        choices: [
            {
                key: 'n',
                name: 'no',
                value: false,
            },
            {
                key: 'y',
                name: 'yes',
                value: true,
            }
        ],
        default: false,
    },
    // {
    //     type: 'number',
    //     name: 'port',
    //     message: `Port number?`,
    //     default: DEFAULT_PORT,
    // },
    {
        type: 'confirm',
        name: 'saveProject',
        message: 'Do you want to save the project for future use (recommended)?',
        choices: [
            {
                key: 'y',
                name: 'yes',
                value: true,
            },
            {
                key: 'n',
                name: 'no',
                value: false,
            }
        ],
        default: true,
    },
];

const provideOptionalNicknamePrompt = {
    type: 'input',
    name: 'nickname',
    message: `Do you have a nickname? Leave blank for no name`,
}

// Display a list of existing projects for the user to select to load
const selectProjectFromListPrompt = {
    type: 'list',
    name: 'selectedProject',
    message: 'Select a project to load',
    choices: null
}


export {
    existingProjectPrompt,
    newProjectPrompt,
    provideOptionalNicknamePrompt,
    selectProjectFromListPrompt,
}