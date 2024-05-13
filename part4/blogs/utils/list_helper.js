const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}

	return blogs.reduce((max, blog) => {
		return blog.likes > max.likes ? blog : max;
	});
};

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}
	const authorCounts = blogs.reduce((counts, blog) => {
		const author = blog.author;
		const updatedCounts = [...counts];
		const existingAuthorIndex = updatedCounts.findIndex(
			(item) => item.author === author
		);
		if (existingAuthorIndex !== -1) {
			updatedCounts[existingAuthorIndex] = {
				...updatedCounts[existingAuthorIndex],
				count: updatedCounts[existingAuthorIndex].count + 1,
			};
		} else {
			updatedCounts.push({ author, count: 1 });
		}
		return updatedCounts;
	}, []);
	const authorWithMostBlogs = authorCounts.sort(
		(a, b) => b.count - a.count
	)[0];
	return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}
	const authorLikes = blogs.reduce((likes, blog) => {
		const author = blog.author;
		const updatedLikes = [...likes];
		const existingAuthorIndex = updatedLikes.findIndex(
			(item) => item.author === author
		);
		if (existingAuthorIndex !== -1) {
			updatedLikes[existingAuthorIndex] = {
				...updatedLikes[existingAuthorIndex],
				likes: updatedLikes[existingAuthorIndex].likes + blog.likes,
			};
		} else {
			updatedLikes.push({ author, likes: blog.likes });
		}
		return updatedLikes;
	}, []);
	const authorWithMostLikes = authorLikes.sort(
		(a, b) => b.likes - a.likes
	)[0];
	return authorWithMostLikes;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
