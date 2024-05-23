"use strict";

import path from "path"

import { test } from "tap"
import { readLastLine, run } from "./helpers.js"

test("ntl run using an absolute path argument", t => {
	const cwd = path.relative(
		import.meta.dirname,
		t.testdir({
			"package.json": JSON.stringify({
				scripts: {
					build: 'echo "build"'
				}
			})
		})
	);

	const cp = run({ cwd: import.meta.dirname }, [cwd]);
	cp.assertNotStderrData(t);
	cp.getStdoutResult().then(res => {
		t.match(readLastLine(res), /build/, "should be able to run task");
		t.end();
	});

	cp.stdin.write("\n");
	cp.stdin.end();
});
