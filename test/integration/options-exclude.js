"use strict";

import { test } from "tap"
import { readLastLine, run } from "./helpers.js"

test("ntl run using --exclude option", t => {
	const cwd = t.testdir({
		"package.json": JSON.stringify({
			scripts: {
				build: 'echo "build"',
				test: 'echo "test"'
			}
		})
	});

	const cp = run({ cwd }, ["--exclude", "build"]);
	cp.assertNotStderrData(t);
	cp.getStdoutResult().then(res => {
		t.match(readLastLine(res), /test/, "should not list excluded tasks");
		t.end();
	});

	cp.stdin.write("\n");
	cp.stdin.end();
});
