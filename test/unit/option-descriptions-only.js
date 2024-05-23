"use strict";

import { test } from "tap"
import esmock from "esmock"
import { mockYargs } from "./helpers.js"

test("build a list using --descriptions-only option", async t => {
	const ntl = await esmock("../../cli.js", {
		"read-pkg": {
			readPackageSync: () => ({
				scripts: {
					build: "make build",
					test: "make test"
				},
				ntl: {
					descriptions: {
						build: "Run build steps"
					}
				}
			})
		},
		ipt: expected => {
			t.same(
				expected,
				[
					{
						name: "build › Run build steps",
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
			success: msg => null
		},
		"yargs/yargs": mockYargs({
			_: [],
			descriptionsOnly: true
		})
	});
});

test("build a list using --descriptions-only option along with --description", async t => {
	const ntl = await esmock("../../cli.js", {
		"read-pkg": {
			readPackageSync: () => ({
				scripts: {
					build: "make build",
					test: "make test"
				},
				ntl: {
					descriptions: {
						build: "Run build steps"
					}
				}
			})
		},
		ipt: expected => {
			t.same(
				expected,
				[
					{
						name: "build › Run build steps",
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
			success: msg => null
		},
		"yargs/yargs": mockYargs({
			_: [],
			descriptions: true,
			descriptionsOnly: true
		})
	});
});
