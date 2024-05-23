"use strict";

import { Session } from 'node:inspector/promises';
import { test } from "tap"
import { readLastLine, run } from "./helpers.js"

const session = new Session();
session.connect();

test("ntl find and run runner from the «packageManager» field", t => {

	debugger
	const cwd = t.testdir({
		"package.json": JSON.stringify({
			scripts: {
				build: 'echo "build"'
			},
			packageManager: "yarn@4.1.1+sha256.f3cc0eda8e5560e529c7147565b30faa43b4e472d90e8634d7134a37c7f59781"
		})
	});

	const cp = run({ cwd });
	cp.getStdoutResult().then(res => {
		t.equal(
			res.toString().includes('(using yarn)'),
			true
		);
		t.end();
	});

	cp.stdin.write("\n");
	cp.stdin.end();
});
