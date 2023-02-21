
import Togglable from './Togglable'

const Blog = ({ blog, handleBlogLike, handleBlogDelete }) => {

	const onLike = () => {handleBlogLike(blog)}
	const onDelete = () => {handleBlogDelete(blog)}

	return (
		<li key={blog.id} className='blog'>{blog.title} {blog.author}
			<Togglable showText={'show'} hideText={'hide'}>
				<ul className="hidden-list">
					<li key='likes'>{`-Likes: ${blog.likes}`} <button className='like-button' onClick={onLike}>Like</button></li>
					<li key='url'>{`URL: ${blog.url}`}</li>
					<li key='from'>{`From: ${blog.user.name}`}</li>
					<li><button onClick={onDelete}>Delete Blog</button></li>
				</ul>
			</Togglable>
		</li>
	)
}

export default Blog