import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

import './app.css'

const App = () => {

	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [info, setInfo] = useState(null)

	const handleUsernameChange = e => setUsername(e.target.value)
	const handlePasswordChange = e => setPassword(e.target.value)

	const handleLogin = async e => {
		e.preventDefault()
		console.log('login submit.')
		console.log('username',username)
		console.log('password',password)

		try {
			const user = await loginService.login({ username, password })
			console.log(user)
			window.localStorage.setItem('loggedInUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
			console.log('login success', user)
			infoMessage(`logged in as ${user.name}`)
		} catch (e) {
			console.log(e.name, e.message)
			console.log('error: incorrect login')
			infoMessage('Incorrect username or password')
		}
	}

	const infoMessage = (message) => {
		setInfo(message)
		setTimeout(() => {setInfo(null)}, 2000)
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedInUser')
		blogService.setToken(null)
		setUser(null)
		infoMessage('Logged out successfully')
	}

	const blogFormRef = useRef()

	const handleBlogCreate = async (title, author, url) => {
		const blogToPost = {
			title: title,
			author: author,
			url: url
		}
		const response = await (blogService.create(blogToPost))
		console.log(response)

		setBlogs(blogs.concat(response))
		infoMessage('Created new blog')

		blogFormRef.current.toggleVisibility()
	}

	const handleBlogLike = async blog => {
		const newBlog = { ...blog, likes: blog.likes+1, user: blog.user.id }
		await blogService.update(blog.id,newBlog)

		setBlogs(blogs.map(b => {
			if (b.id === blog.id) {
				return { ...blog, likes: blog.likes+1 }
			} else {
				return b
			}
		}))
	}

	const handleBlogDelete = async blog => {
		if (!window.confirm(`Delete blog ${blog.title}?`)) return

		const response = await blogService.remove(blog.id)
		if (response.status === 204) {
			setBlogs(blogs.filter(b => b.id !== blog.id))
		} else {
			console.log('blog not deleted.', response)
		}
	}

	useEffect(() => {
		(async () => {
			const newBlogs = await blogService.getAll()
			setBlogs(newBlogs)
		})()
		const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
		if (loggedInUser) {
			setUser(loggedInUser)
			blogService.setToken(loggedInUser.token)
		}
	}, [])

	return (
		user
			// Blogs Area
			? (<div>
				{info && <p className='info-box'>{info}</p> }
				<div>{`(Logged in as ${user.name} `} <button className='logout-button' onClick={handleLogout}>logout</button>{')'}</div>
				<h2>BLOGS</h2>

				<Togglable showText={'Add Blog'} hideText={'Cancel'} ref={blogFormRef}>
					<NewBlogForm handleOnSubmit={handleBlogCreate}/>
				</Togglable>
				<ul>
					{blogs.sort((b1,b2) => b2.likes-b1.likes).map(b =>
						(<Blog
							key={b.id}
							blog={b}
							handleBlogLike={handleBlogLike}
							handleBlogDelete={handleBlogDelete}
						/>)
					)}
				</ul>


			</div>)
			// Login Form
			: (<div>
				{info && <p className='info-box'>{info}</p> }
				<h1>login</h1>
				<form onSubmit={handleLogin}>
					<label>
						username
						<input className="input-username" value={username} onChange={handleUsernameChange} />
					</label><br></br>
					<label>
						password
						<input className="input-password" value={password} onChange={handlePasswordChange} />
					</label><br></br>
					<button className="submit-button" type='submit'>login</button>
				</form>
			</div>)
	)
}

export default App