const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const { blogs } = require("../utils/blogs");

const listWithOneBlog = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0,
	},
];

const listWithTwoBlogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0,
	},
	{
		_id: "5a422a851b54a676234d17f8",
		title: "JavaScript Basics",
		author: "John Doe",
		url: "https://javascriptbasics.com/",
		likes: 10,
		__v: 0,
	},
];

test("dummy returns one", () => {
	const blogs = [];
	const result = listHelper.dummy(blogs);
	assert.strictEqual(result, 1);
});

describe("total likes", () => {
	test("of empty list is zero", () => {
		const result = listHelper.totalLikes([]);
		assert.strictEqual(result, 0);
	});
	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		assert.strictEqual(result, 7);
	});
	test("of a bigger list is calculated right", () => {
		const result = listHelper.totalLikes(listWithTwoBlogs);
		assert.strictEqual(result, 17);
	});
});

describe("favorite blog", () => {
	const favoriteBlog = listHelper.favoriteBlog(listWithTwoBlogs);
	assert.deepStrictEqual(favoriteBlog, listWithTwoBlogs[1]);
});

describe("most blogs", () => {
	const authorWithMostBlogs = listHelper.mostBlogs(blogs);
	assert.deepStrictEqual(authorWithMostBlogs, {
		author: "Robert C. Martin",
		count: 3,
	});
});

describe("most likes", () => {
	const authorWithMostLikes = listHelper.mostLikes(blogs);
	assert.deepStrictEqual(authorWithMostLikes, {
		author: "Edsger W. Dijkstra",
		likes: 17,
	});
});
