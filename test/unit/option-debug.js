"use strict";

import { test } from "tap"
import esmock from "esmock"
import { mockYargs } from "./helpers.js"

test("error while use --debug option", async t => {
	const _exit = process.exit;
	process.exit = code => {
		t.equal(code, 1, "should exit with error signal");
	};
	t.teardown(() => {
		process.exit = _exit;
	});
	t.plan(2);
	const ntl = await esmock("../../cli.js", {
		"read-pkg": {
			readPackageSync: () => {
				throw new Error("ERR");
			}
		},
		"simple-output": {
			error: msg => {
				t.match(
					msg,
					{
						message: "ERR"
					},
					"should forward original error message"
				);
			},
			info: () => null
		},
		"yargs/yargs": mockYargs({
			_: [],
			debug: true
		})
	});
});
