"use strict";

import { test } from "tap"
import esmock from "esmock"
import { mockYargs } from "./helpers.js"

test("build a list using --info option", async t => {
	const ntl = await esmock("../../cli.js", {
		"read-pkg": {
			readPackageSync: () => ({
				scripts: {
					build: "make build",
					test: "make test"
				}
			})
		},
		ipt: expected => {
			t.same(
				expected,
				[
					{
						name: "build › make build",
						value: "build"
					},
					{
						name: " test › make test",
						value: "test"
					}
				],
				"should build a list showing each script content"
			);
			t.end();
			return Promise.resolve([]);
		},
		"simple-output": {
			node: () => null,
			success: msg => null
		},
		"yargs/yargs": mockYargs({
			_: [],
			info: true
		})
	});
});
