// Project saving and retrieving
import fs from 'fs';
import { config } from './config.js';
import path from 'path';
import { fileURLToPath } from 'url';

const getFileLocation = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const file = path.join(__dirname, '../' + config.save_file);
    return file;
}

const getProjectData = () => {
    try {
        const fileContents = fs.readFileSync(getFileLocation(), 'utf-8');
        if (fileContents == null) throw "No file found";
        return JSON.parse(fileContents);
    } catch (err) {
        return null;
    }
}

const setSavedProjectData = (data) => {
    try {
        fs.writeFileSync(getFileLocation(), JSON.stringify(data));

        console.log("Saved project data to npm package location");
    } catch (err) {
        console.log('Issue trying to save data to json file with name', config.save_file);
    }
}

const checkForExistingProject = (url, data) => {
    return (data.filter(d => d.url === url).length > 0);
}

const saveProjectData = (project) => {
    let currentData = getProjectData();

    if (currentData === null) {
        currentData = [];
    } else {
        const found = checkForExistingProject(project.url, currentData);
        if (found) {
            console.log("That URL already exists in a project"); // TODO: overwriting values
        }
    }

    currentData.push(project);
    setSavedProjectData(currentData);
}

const getCustomFileOverrides = (file) => {
    try {
        const fileContents = fs.readFileSync(file, 'utf-8');
        if (fileContents == null) throw "No file found";
        return fileContents.toString();
    } catch (err) {
        return null;
    }
}

export {
    getProjectData,
    saveProjectData,
    getCustomFileOverrides,
}