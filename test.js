"use strict";
const expect = require("chai").expect;
const it = require("mocha").it;
const parse = require("parse5").parse;
const walk = require("./");

const html = parse("<!doctype html><html><head><title>title</title></head></body>content</body></html>");



it("accepts a document node", function()
{
	const history = [];

	walk(html, node => history.push(node.nodeName));

	expect(history).to.deep.equal(["#document","#documentType","html","head","title","#text","body","#text"]);
});



it("accepts a child node", function()
{
	const history = [];

	walk(html.childNodes[1].childNodes[0], node => history.push(node.nodeName));

	expect(history).to.deep.equal(["head","title","#text"]);
});



it("can optionally be killed", function()
{
	const history = [];

	walk(html, function(node)
	{
		history.push(node.nodeName);

		if (node.nodeName === "head")
		{
			return false;
		}
	});

	expect(history).to.deep.equal(["#document","#documentType","html","head"]);
});
