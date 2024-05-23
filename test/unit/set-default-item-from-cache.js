"use strict";

import os from "os"
import { test } from "tap"
import esmock from "esmock"
import { mockYargs } from "./helpers.js"

function setup(t, env) {
	const _env = process.env;
	delete process.env.NTL_NO_RERUN_CACHE;

	process.env = {
		...process.env,
		...env
	};

	t.teardown(() => {
		process.env = _env;
	});
}

test("set default option on list", async t => {
	setup(t);
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
		"lru-cache-fs": class {
			get() {
				return ["test"];
			}
		},
		child_process: {
			execSync: () => null
		},
		ipt: (expected, opts) => {
			t.same(
				expected,
				[
					{
						name: "build",
						value: "build"
					},
					{
						name: "test",
						value: "test"
					}
				],
				"should build a regular interface"
			);
			t.same(
				opts,
				{
					autocomplete: undefined,
					default: "test",
					"default-separator": os.EOL,
					message: "Select a task to run:",
					multiple: undefined,
					ordered: undefined,
					size: undefined
				},
				"should set default option on ipt"
			);
			return Promise.resolve([]);
		},
		"simple-output": {
			node: () => null,
			success: () => null,
			warn: () => null
		},
		"yargs/yargs": mockYargs({
			_: []
		})
	});
});

test("set multiple default options", async t => {
	setup(t);
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
		"lru-cache-fs": class {
			get() {
				return ["build", "test"];
			}
		},
		child_process: {
			execSync: () => null
		},
		ipt: (expected, opts) => {
			t.same(
				expected,
				[
					{
						name: "build",
						value: "build"
					},
					{
						name: "test",
						value: "test"
					}
				],
				"should build a regular interface"
			);
			t.same(
				opts,
				{
					autocomplete: undefined,
					default: ["build", "test"].join(os.EOL),
					"default-separator": os.EOL,
					message: "Select a task to run:",
					multiple: undefined,
					ordered: undefined,
					size: undefined
				},
				"should set default option on ipt"
			);
			return Promise.resolve([]);
		},
		"simple-output": {
			node: () => null,
			success: () => null,
			warn: () => null
		},
		"yargs/yargs": mockYargs({
			_: []
		})
	});
});
