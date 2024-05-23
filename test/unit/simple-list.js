"use strict";

import { test } from "tap"
import esmock from "esmock"

test("build a simple list of items", async t => {
	const ntl = await esmock("../../cli.js", {
		"read-pkg": {
			readPackageSync: () => ({
				scripts: {
					test: "make test",
					build: "make build"
				}
			})
		},
		ipt: expected => {
			t.same(
				expected,
				[
					{
						name: "test",
						value: "test"
					},
					{
						name: "build",
						value: "build"
					}
				],
				"should build a list with the task names"
			);
			t.end();
			return Promise.resolve([]);
		},
		"simple-output": {
			node: () => null,
			success: () => null
		}
	});
});

test("select one item from the list", async t => {
	const ntl = await esmock("../../cli.js", {
		"read-pkg": {
			readPackageSync: () => ({
				scripts: {
					test: "make test",
					build: "make build"
				}
			})
		},
		ipt: expected => {
			return Promise.resolve(["build"]);
		},
		child_process: {
			execSync: cmd => {
				t.equal(cmd, "npm run build", "should run the selected task");
				t.end();
			}
		},
		"simple-output": {
			node: () => null,
			success: () => null
		}
	});
});
