"use strict";

import { test } from "tap"
import esmock from "esmock"
import { mockYargs } from "./helpers.js"

test("build a list withouth using --all option", async t => {
	const ntl = await esmock("../../cli.js", {
		"read-pkg": {
			readPackageSync: () => ({
				scripts: {
					prebuild: "make prebuild",
					build: "make build"
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
				"should build a list excluding prefixed tasks"
			);
			t.end();
			return Promise.resolve([]);
		},
		"simple-output": {
			node: () => null,
			success: () => null
		},
		"yargs/yargs": mockYargs({
			_: []
		})
	});
});

test("build a list using --all option", async t => {
	const ntl = await esmock("../../cli.js", {
		"read-pkg": {
			readPackageSync: () => ({
				scripts: {
					prebuild: "make prebuild",
					build: "make build"
				}
			})
		},
		ipt: expected => {
			t.same(
				expected,
				[
					{
						name: "prebuild",
						value: "prebuild"
					},
					{
						name: "build",
						value: "build"
					}
				],
				"should build a list including prefixed tasks"
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
			all: true
		})
	});
});
