#!/usr/bin/env bash
npm init
npm install plottable
npm install -g browserify
npm install esmify
browserify script.js -p esmify -o bundle.js
