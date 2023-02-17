import { useState } from "react"


const NewBlogForm = ({ handleOnSubmit }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = e => {setTitle(e.target.value)}
    const handleAuthorChange = e => {setAuthor(e.target.value)}
    const handleUrlChange = e => {setUrl(e.target.value)}

    const clearAndSubmit = e => {
        e.preventDefault()

        setTitle('')
        setAuthor('')
        setUrl('')

        handleOnSubmit(title, author, url)
    }

    return (
    <>
        <h2>Create New Blog</h2>
        <form onSubmit={clearAndSubmit}>
            <label>Title: 
                <input value={title} onChange={handleTitleChange}></input>
            </label><br></br>
            <label>Author: 
                <input value={author} onChange={handleAuthorChange}></input>
            </label><br></br>
            <label>URL: 
                <input value={url} onChange={handleUrlChange}></input>
            </label><br></br>
            <button type='submit'>Create Blog</button>
            
        </form>
    </>
    )
}

export default NewBlogForm