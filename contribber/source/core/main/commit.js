#!/usr/bin/env node
import fs from 'node:fs';
import url from 'node:url';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

import error from '../../utils/error.js'
import success from '../../utils/success.js';
import descriptions from './descriptions.js';

export default function commit(times) {
    try {
        while(times >= 0) {
            if(times == 0) {
                spawnSync('git', ['push']);
                success('SUCCESSFULLY CREATE SOME COMMITS');
                break;
            };
            let date = new Date;
            let start = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate() - 1);
            let end = date;
            let time = (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).toUTCString();
            let description = descriptions[Math.floor(Math.random() * descriptions.length) - 1];
            fs.writeFile(path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'commit.txt'), description + '', (_error) => {
                if(_error)
                    error('FAILED TO CREATE A COMMIT', _error);
            });
            spawnSync('git', ['add', '.']);
            spawnSync('git', ['commit', '-m', `"${ description }"`, '--date',  `"${ time }"`]);
            --times;
        };
    } catch(_error) {
        error('FAILED TO CREATE SOME COMMITS', _error);
        process.exit(1);
    };
};