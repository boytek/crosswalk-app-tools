// Copyright © 2014 Intel Corporation. All rights reserved.
// Use  of this  source  code is  governed by  an Apache v2
// license that can be found in the LICENSE-APACHE-V2 file.

var FS = require("fs");
var OS = require('os');
var MkTemp = require('mktemp');
var ShellJS = require("shelljs");
// Run tests silently to avoid spew from tests failing on purpose.
require("../src/Config").setSilentConsole(true);
var Console = require("../src/Console");
var TemplateFile = require("../src/TemplateFile");


exports.tests = {

    ctor: function(test) {

        test.expect(1);

        try {
            var tpl = new TemplateFile(__dirname + "/data/template-file.in");
            test.equal(true, true);
        } catch(e) {
            Console.error(e.message);
            test.equal(true, false);
        }

        test.done();
    },

    render: function(test) {

        test.expect(1);

        try {
            var tpl = new TemplateFile(__dirname + "/data/template-file.in");

            // MkTemp creates temp dir in working dir, so cd tmp first.
            ShellJS.pushd(OS.tmpdir());

            var tmpfile = MkTemp.createFileSync("XXXXXX.crosswalk-app-tools.template-file.out");
            Console.log("Tempfile: " + tmpfile);

            tpl.render({bar: "maman"}, tmpfile);

            // Read back in and compare.
            var output = FS.readFileSync(tmpfile, {"encoding": "utf8"});
            test.equal(output, "foo maman baz");

            ShellJS.rm("-f", tmpfile);
            ShellJS.popd();

        } catch(e) {
            Console.error(e.message);
            test.equal(true, false);
        }

        test.done();
    }
};