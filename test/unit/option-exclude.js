"use strict";

import { test } from "tap"
import esmock from "esmock"
import { mockYargs } from "./helpers.js"

test("build a list using --exclude option", async t => {
	t.plan(1);
	const ntl = await esmock("../../cli.js", {
		"read-pkg": {
			readPackageSync: () => ({
				scripts: {
					build: 'echo "build"',
					test: 'echo "test"'
				}
			})
		},
		ipt: expected => {
			t.same(
				expected,
				[
					{
						name: "build",
						value: "build"
					}
				],
				"should build a list with only non-excluded items"
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
			exclude: ["test"]
		})
	});
});

test("build a list using --exclude option using *", async t => {
	t.plan(1);
	const ntl = await esmock("../../cli.js", {
		"read-pkg": {
			readPackageSync: () => ({
				scripts: {
					build: 'echo "build"',
					test: 'echo "test"',
					"test:unit": 'echo "test:unit"',
					"test:integration": 'echo "test:integration"'
				}
			})
		},
		ipt: expected => {
			t.same(
				expected,
				[
					{
						name: "build",
						value: "build"
					}
				],
				"should build a list with only non-excluded items"
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
			exclude: ["test*"]
		})
	});
});
