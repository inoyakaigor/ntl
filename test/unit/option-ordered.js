"use strict";

import os from "os"
import { test } from "tap"
import esmock from "esmock"
import { mockYargs } from "./helpers.js"

test("build an interface using selectable items in order", async t => {
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
					ordered: true,
					size: undefined
				},
				"should use ordered:true option while building the list"
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
			ordered: true
		})
	});
});

test("run multiple commands in order", async t => {
	t.plan(2);
	const ntl = await esmock("../../cli.js", {
		"read-pkg": {
			readPackageSync: () => ({
				scripts: {
					build: "make build",
					test: "make test"
				}
			})
		},
		ipt: items => {
			return Promise.resolve(items.map(item => item.name));
		},
		child_process: {
			execSync: cmd => {
				t.ok(cmd.startsWith("npm run"), "should run multiple commands");
			}
		},
		"simple-output": {
			node: () => null,
			success: () => null
		},
		"yargs/yargs": mockYargs({
			_: [],
			ordered: true
		})
	});
});
