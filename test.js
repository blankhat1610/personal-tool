import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Native addons can only be loaded using require
const hello = require('./build/Release/addon');

console.log('Path meta url for require:', import.meta.url);
console.log('Result from Cpp:', hello.add(4, 1));
