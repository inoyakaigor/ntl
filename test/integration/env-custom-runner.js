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

	const cp = run({
		cwd,
		env: {
			NTL_RUNNER: "echo"
		}
	});
	cp.assertNotStderrData(t);
	cp.getStdoutResult().then(res => {
		t.equal(
			readLastLine(res),
			"run build",
			"should env variable-defined custom runner"
		);
		t.end();
	});

	cp.stdin.write("\n");
	cp.stdin.end();
});
