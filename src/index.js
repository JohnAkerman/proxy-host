import inquirer from "inquirer";
import browserSync from 'browser-sync';
import qrcode from 'qrcode-terminal';

import {
    existingProjectPrompt,
    newProjectPrompt,
    provideOptionalNicknamePrompt,
    selectProjectFromListPrompt,
} from './prompts.js';

import { config } from './config.js';

import { saveProjectData, getProjectData } from './storage.js';

const BOLD_CMD_START_CHARS = "\u001B[1m";
const BOLD_CMD_END_CHARS = "\u001B[22m";

const runStartPrompt = () => {
    inquirer.prompt(existingProjectPrompt).then(answers => {
        if (answers.existingProject === true) {
            const existingProjects = getProjectData();
            if (existingProjects == null) {
                console.log('There are no existing projects, please create a new one...');
                showNewProjectPrompt();
            } else {
                existingProjects.reverse();
                selectProjectFromListPrompt.choices = existingProjects.map(project => {
                    const projectLabel = project.nickname !== null && typeof project.nickname !== 'undefined' ? `${project.nickname} - ${project.url}` : project.url;
                    const projectVerboseLabel = ` - qr:${project.qr} - overrides:${project.overrides} - open browser:${project.openBrowser} - sync browser:${project.syncBrowserActions}`;
                    return {
                        'name': `${projectLabel}${(config.verbose_project_list ? projectVerboseLabel : '')}`,
                        'value': project
                    }
                });

                inquirer.prompt(selectProjectFromListPrompt).then(projectSelectionAnswers => {
                    runProject(projectSelectionAnswers.selectedProject);
                });
            }
        } else {
            showNewProjectPrompt();
        }
    });
}

const showNewProjectPrompt = () => {
    inquirer.prompt(newProjectPrompt).then(newProjectAnswers => {
        const { url, qr, overrides, openBrowser, syncBrowserActions, saveProject } = newProjectAnswers;
        const project = {
            url,
            qr,
            port: config.port,
            overrides,
            openBrowser,
            syncBrowserActions,
            nickname: null,
        }

        if (saveProject) {
            inquirer.prompt(provideOptionalNicknamePrompt).then(projectNicknameAnswers => {
                if (projectNicknameAnswers.nickname !== null) {
                    project.nickname = projectNicknameAnswers.nickname;
                }

                saveProjectData(project)
                runProject(project);
            });
        } else {
            runProject(project);
        }
    });
}

const runProject = (project) => {
    const launchOpts = {
        port: project.port,
        proxy: project.url,
        open: project.openBrowser === true ? 'local' : false,
        // logLevel: 'debug',
        logLevel: 'silent',
        notify: false,
        tunnel: null,
        files: [],
        online: true,
        ghostMode: {
            clicks: project.syncBrowserActions,
            forms: project.syncBrowserActions,
            scroll: project.syncBrowserActions
        }
    };

    // If the project is using local file overrides
    // Local overrides here
    browserSync.create().init(launchOpts, (err, instance) => {
        const localUrl = instance.options.getIn(['urls', 'local']);
        const localExternal = instance.options.getIn(['urls', 'external']) || '';
        const uiUrl = instance.options.getIn(['urls', 'ui']);

        if (localUrl || localExternal) {
            if (project.qr) {
                qrcode.generate(localExternal, { small: true });
            }

            const overrideStr = project.overrides ? ' with overrides' : '';
            console.log('------------------------------------');
            console.log(`${BOLD_CMD_START_CHARS}Serving URL:${BOLD_CMD_END_CHARS} ${project.url} as ${localUrl} / ${localExternal}${overrideStr}`);
            console.log(`${BOLD_CMD_START_CHARS}UI URL:${BOLD_CMD_END_CHARS} ${uiUrl}`);
            console.log('------------------------------------');
            console.log(`Press Ctrl + C to break from process`);
        }
    });
}

runStartPrompt()