"use strict";

import { test } from "tap"
import { readLastLine, run } from "./helpers.js"

test("ntl run using --descriptions-only option", t => {
	const cwd = t.testdir({
		"package.json": JSON.stringify({
			scripts: {
				build: 'echo "build"',
				test: 'echo "test"'
			},
			ntl: {
				descriptions: {
					test: "Run tests"
				}
			}
		})
	});

	const cp = run({ cwd }, ["--descriptions-only"]);
	cp.assertNotStderrData(t);
	cp.getStdoutResult().then(res => {
		t.match(readLastLine(res), /test/, "should run test that has descriptions");
		t.end();
	});

	cp.stdin.write("\n");
	cp.stdin.end();
});
