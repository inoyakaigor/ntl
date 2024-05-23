"use strict";

import { test } from "tap"
import esmock from "esmock"
import { mockYargs } from "./helpers.js"

test("forward an option past -- ", async t => {
	const _argv = process.argv;
	process.argv = process.argv.concat(["--", "--one-more-thing"]);
	t.teardown(() => {
		process.argv = _argv;
	});
	const ntl = await esmock("../../cli.js", {
		"read-pkg": {
			readPackageSync: () => ({
				scripts: {
					build: "make build"
				}
			})
		},
		ipt: () => {
			return Promise.resolve(["build"]);
		},
		child_process: {
			execSync: cmd => {
				t.equal(
					cmd,
					"npm run build -- --one-more-thing",
					"should forward any trailing options"
				);
				t.end();
			}
		},
		"simple-output": {
			node: () => null,
			success: () => null
		}
	});
});

test("forward many options past -- ", async t => {
	const _argv = process.argv;
	process.argv = process.argv.concat([
		"--",
		"--one-more-thing",
		"package.json",
		"--second-item",
		"-foo"
	]);
	t.teardown(() => {
		process.argv = _argv;
	});
	const ntl = await esmock("../../cli.js", {
		"read-pkg": {
			readPackageSync: () => ({
				scripts: {
					build: "make build"
				}
			})
		},
		ipt: () => {
			return Promise.resolve(["build"]);
		},
		child_process: {
			execSync: cmd => {
				t.equal(
					cmd,
					"npm run build -- --one-more-thing package.json --second-item -foo",
					"should forward any trailing options"
				);
				t.end();
			}
		},
		"simple-output": {
			node: () => null,
			success: () => null
		}
	});
});
