import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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
      window.localStorage.setItem('loggedInUser',user)
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
    setUser(null)
  }



  useEffect(() => {
    (async () => {
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
    })()
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) setUser(loggedInUser)
  }, [])

  return (
    user
    ? (<div>
        <button onClick={handleLogout}>logout</button>
        <h2>blogs</h2>
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