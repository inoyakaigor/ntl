"use strict";

import { test } from "tap"
import { readLastLine, run } from "./helpers.js"

test("ntl run using --multiple option", t => {
	const cwd = t.testdir({
		"package.json": JSON.stringify({
			scripts: {
				build: 'echo "BUILD TASK"',
				test: 'echo "TEST TASK"'
			}
		})
	});

	const cp = run({ cwd }, ["--multiple"]);
	cp.assertNotStderrData(t);
	cp.getStdoutResult().then(res => {
		const taskOutput = res.toString().trim();
		t.match(
			taskOutput,
			"BUILD TASK",
			"should be able to run first selected task"
		);
		t.match(
			taskOutput,
			"TEST TASK",
			"should be able to run last selected task"
		);
		t.end();
	});

	cp.stdin.write(" ");
	cp.stdin.write("j");
	cp.stdin.write(" ");
	cp.stdin.write("\n");
	cp.stdin.end();
});
