"use strict";

import os from "os"
import { test } from "tap"
import esmock from "esmock"
import { mockYargs } from "./helpers.js"

test("build an interface using a specific max number of lines to be displayed", async t => {
	const ntl = await esmock("../../cli.js", {
		"read-pkg": {
			readPackageSync: () => ({
				scripts: {
					test: "make test"
				}
			})
		},
		ipt: (items, expected) => {
			t.same(
				expected,
				{
					autocomplete: undefined,
					default: undefined,
					"default-separator": os.EOL,
					message: "Select a task to run:",
					multiple: undefined,
					ordered: undefined,
					size: 10
				},
				"should use specific size option while building the list"
			);
			t.end();
			return Promise.resolve([]);
		},
		"simple-output": {
			node: () => null,
			success: () => null
		},
		"yargs/yargs": mockYargs({
			_: [],
			size: 10
		})
	});
});
