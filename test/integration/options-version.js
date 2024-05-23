"use strict";

import { readFile } from 'node:fs/promises'
import { test } from "tap"
import { readLastLine, run } from "./helpers.js"

const fileUrl = new URL("../../package.json", import.meta.url)
const parsedPackageJSON = JSON.parse(await readFile(fileUrl, 'utf8'))

test("ntl run using --version option", t => {
	const cwd = t.testdir({
		"package.json": JSON.stringify({
			scripts: {
				build: 'echo "build"'
			}
		})
	});

	const cp = run({ cwd }, ["--version"]);
	cp.assertNotStderrData(t);
	cp.getStdoutResult().then(res => {
		const taskOutput = res[0].toString().trim();
		t.match(
			taskOutput,
			parsedPackageJSON.version,
			"should match current version of package"
		);
		t.end();
	});

	cp.stdin.write("\n");
	cp.stdin.end();
});
