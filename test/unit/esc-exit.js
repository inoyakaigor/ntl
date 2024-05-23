"use strict";

import path from "node:path"
import { test } from "tap"
import esmock from "esmock"

test("press esc key", async t => {
	const _exit = process.exit;
	const _stdin = process.stdin;
	process.exit = code => {
		t.equal(code, 0, "should exit with error signal");
		t.end();
	};
	t.teardown(() => {
		process.exit = _exit;
	});
	const ntl = await esmock(
		path.join(path.resolve(import.meta.dirname, "../.."), "cli.js"),
		{
			ipt: () => Promise.resolve([]),
			"simple-output": {
				node: () => null,
				success: () => null,
				error: msg => {
					t.equal(
						msg,
						"Error building interactive interface",
						"should forward original error message"
					);
				},
				info: () => null
			}
		});

	// simulate esc key
	process.stdin.emit("keypress", "", { name: "escape" });
});
