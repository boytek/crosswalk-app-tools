// Copyright © 2014 Intel Corporation. All rights reserved.
// Use  of this  source  code is  governed by  an Apache v2
// license that can be found in the LICENSE-APACHE-V2 file.

var Config = require("./Config");
var FiniteProgress = require("./FiniteProgress");
var InfiniteProgress = require("./InfiniteProgress");
var OutputIface = require("./OutputIface");

/**
 * Creates a logging output.
 * @extends OutputIface
 * @constructor
 */
function TerminalOutput() {}

TerminalOutput.prototype = OutputIface.prototype;

TerminalOutput.prototype.error =
function(message) {

    if (!Config.getSilentConsole())
        console.error("ERROR: " + message);
};

TerminalOutput.prototype.log =
function(message) {

    if (!Config.getSilentConsole())
        console.log(message);
};

TerminalOutput.prototype.highlight =
function(message) {

    if (!Config.getSilentConsole())
        console.log('\033[1m' + message + '\033[0m');
};

TerminalOutput.prototype.put =
function(message, stderr) {

    // Default to stdout.
    if (typeof stderr === "undefined")
        stderr = false;

    if (!Config.getSilentConsole()) {
        if (stderr) {
            process.stderr.write(message);
        } else {
            process.stdout.write(message);
        }
    }
};

/**
 * Create progress indicator.
 * @param {String} [label] descriptive label
 * @returns {@link FiniteProgress}
 */
TerminalOutput.prototype.createFiniteProgress =
function(label) {

    if (typeof label === "undefined")
        label = "";

    var indicator = new FiniteProgress(this, label);
    return indicator;
};

/**
 * Create progress indicator.
 * @param {String} [label] descriptive label
 * @returns {@link InfiniteProgress}
 */
TerminalOutput.prototype.createInfiniteProgress =
function(label) {

    if (typeof label === "undefined")
        label = "";

    var indicator = new InfiniteProgress(this, label);
    return indicator;
};

module.exports = new TerminalOutput();