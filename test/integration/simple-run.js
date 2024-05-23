"use strict";

import { test } from "tap"
import { readLastLine, run } from "./helpers.js"

test("ntl run and select first item", t => {
	const cwd = t.testdir({
		"package.json": JSON.stringify({
			scripts: {
				build: 'echo "build"'
			}
		})
	});

	const cp = run({ cwd });
	cp.assertNotStderrData(t);
	cp.getStdoutResult().then(res => {
		t.match(readLastLine(res), /build/, "should be able to run task");
		t.end();
	});

	cp.stdin.write("\n");
	cp.stdin.end();
});
