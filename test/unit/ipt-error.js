"use strict";

import { test } from "tap"
import esmock from "esmock"

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
		ipt: () => Promise.reject(new Error("ERR")),
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
});
