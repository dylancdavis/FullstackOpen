import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)

  const handleLogin = async e => {
    e.preventDefault()
    console.log('login submit.');
    console.log('username',username);
    console.log('password',password);

    try {
      const user = await loginService.login({username, password})
      console.log(user);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('login success', user);
    } catch (e) {
      console.log(e.name, e.message);
      console.log('error: incorrect login');
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleBlogCreate = async (title, author, url) => {
    const blogToPost = {
      title: title,
      author: author,
      url: url
    }
    const response = await (blogService.create(blogToPost))
    console.log(response);

    setBlogs(blogs.concat(response))
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
    ? (<div>
        <div>{`(Logged in as ${user.name} `} <button onClick={handleLogout}>logout</button>{`)`}</div>
        <h2>BLOGS</h2>
        
        <NewBlogForm handleOnSubmit={handleBlogCreate}/><br></br>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}

      </div>)
    : (<div>
        <h1>login</h1>
        <form onSubmit={handleLogin}>
          <label>
            username
            <input value={username} onChange={handleUsernameChange} />
          </label><br></br>
          <label>
            password
            <input value={password} onChange={handlePasswordChange} />
          </label><br></br>
          <button type='submit'>login</button>
        </form>
      </div>)
  )
}

export default App