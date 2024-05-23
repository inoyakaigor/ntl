"use strict";

import { test } from "tap"
import esmock from "esmock"
import { mockYargs } from "./helpers.js"

test("build a list from a specific path", async t => {
	const cwd = t.testdir({
		"package.json": JSON.stringify({
			scripts: {
				build: 'echo "build"'
			}
		})
	});

	const ntl = await esmock("../../cli.js", {
		ipt: expected => {
			t.same(
				expected,
				[
					{
						name: "build",
						value: "build"
					}
				],
				"should build a valid list"
			);
			t.end();
			return Promise.resolve([]);
		},
		"simple-output": {
			node: () => null,
			success: () => null
		},
		"yargs/yargs": mockYargs({
			_: [cwd]
		})
	});
});
