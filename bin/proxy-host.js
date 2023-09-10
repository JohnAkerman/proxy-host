#!/usr/bin/env node
'use strict';

import { run } from '../src/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const handleUserInput = (input) => {
    if (input === '-h' || input === '--help') {
        showHelp();
        process.exit(1);
    }

    if (input === '-v' || input === '--version') {
        showVersion();
        process.exit(1);
    }

    run();
}

const showHelp = () => {
    const packageName = process.argv[1].replace(/^.*[\\\/]/, '').replace('.js', '');

    console.log([
        '',
        'Usage: ' + packageName,
        '',
        'Options:',
        '  -h, --help           output usage information',
        '  -v, --version        output version number',
        '',
        'Examples:',
        '',
        '  $ ' + packageName + '',
        ''
    ].join('\n'));
}

const showVersion = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const packagePath = path.join(__dirname, '..', 'package.json');
    const packageJSON = JSON.parse(fs.readFileSync(packagePath), 'utf8');

    console.log(packageJSON.version);
}


if (process.stdin.isTTY) {
    const input = process.argv[2];
    handleUserInput(input);
}