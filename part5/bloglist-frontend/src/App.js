import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'

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
      infoMessage(`logged in as ${user.name}`)
    } catch (e) {
      console.log(e.name, e.message);
      console.log('error: incorrect login');
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

  const handleBlogCreate = async (title, author, url) => {
    const blogToPost = {
      title: title,
      author: author,
      url: url
    }
    const response = await (blogService.create(blogToPost))
    console.log(response);

    setBlogs(blogs.concat(response))
    infoMessage('Created new blog')
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
        {info && <p className='info-box'>{info}</p> }
        <div>{`(Logged in as ${user.name} `} <button onClick={handleLogout}>logout</button>{`)`}</div>
        <h2>BLOGS</h2>
        
        <Togglable>
          <NewBlogForm handleOnSubmit={handleBlogCreate}/>
        </Togglable><br></br>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}

      </div>)
    : (<div>
        {info && <p className='info-box'>{info}</p> }
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

const Togglable = (props) => {

  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  return (
    <>
      {!visibility && <button onClick={toggleVisibility}>Add Blog</button>}
      {visibility && <button onClick={toggleVisibility}>Cancel</button>}
      {visibility && props.children}
    </>
  )
}

export default App