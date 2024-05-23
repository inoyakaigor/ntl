"use strict";

import { test } from "tap"
import { readLastLine, run } from "./helpers.js"

test("ntl run and select first item", t => {
	const cwd = t.testdir({
		"package.json": JSON.stringify({
			scripts: {
				build: 'echo "build"'
			},
			ntl: {
				runner: "echo"
			}
		})
	});

	const cp = run({ cwd });
	cp.assertNotStderrData(t);
	cp.getStdoutResult().then(res => {
		t.equal(
			readLastLine(res),
			"run build",
			"should config-defined custom runner"
		);
		t.end();
	});

	cp.stdin.write("\n");
	cp.stdin.end();
});
