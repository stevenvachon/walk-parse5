"use strict";
const {expect} = require("chai");
const {it} = require("mocha");
const {parse} = require("parse5");
const walk = require("./");

const html = parse("<!doctype html><html><head><title>title</title></head></body>content</body></html>");



it("accepts a document node", () =>
{
	const history = [];

	walk(html, node => history.push(node.nodeName));

	expect(history).to.deep.equal(["#document","#documentType","html","head","title","#text","body","#text"]);
});



it("accepts a child node", () =>
{
	const history = [];

	walk(html.childNodes[1].childNodes[0], node => history.push(node.nodeName));

	expect(history).to.deep.equal(["head","title","#text"]);
});



it("can optionally be killed", () =>
{
	const history = [];

	walk(html, node =>
	{
		history.push(node.nodeName);

		if (node.nodeName === "head")
		{
			return false;
		}
	});

	expect(history).to.deep.equal(["#document","#documentType","html","head"]);
});
