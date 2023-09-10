#!/usr/bin/env node
'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packagePath = path.join(__dirname, '../../', 'package.json');
const packageJSON = JSON.parse(fs.readFileSync(packagePath), 'utf8');

const pathToBinary = path.join(__dirname, '../../bin/proxy-host.js');

function runBinaryCaptureOutput(args, conditionMet, done) {
    const child = spawn('node', [
        pathToBinary,
    ].concat(args));

    const output = [];

    child.stdout.on('data', function (data) {
        output.push(data.toString());

        if (conditionMet(output.join(''))) {
            child.kill("SIGINT");
        } else {
            done(new Error(`Condition not met '${args.join(' ')}'`));
        }
    });

    child.stderr.on('data', function (data) {
        done(new Error('Condition not met ' + data));
    });

    child.on('close', function (exitCode) {
        done();
    });
}

describe("It should display the version correctly", function () {
    this.timeout(10000);

    it("--version", function (done) {
        runBinaryCaptureOutput(['-v'], text => text.includes(packageJSON.version), done);
    });
});