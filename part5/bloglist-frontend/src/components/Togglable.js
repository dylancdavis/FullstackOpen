import { forwardRef, useImperativeHandle, useState } from "react"

const Togglable = forwardRef(({showText, hideText, children}, refs) => {

    const [visibility, setVisibility] = useState(false)

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    useImperativeHandle(refs, () => { return {toggleVisibility} })

    return (
        <>
        {!visibility && <button onClick={toggleVisibility}>{showText}</button>}
        {visibility && <button onClick={toggleVisibility}>{hideText}</button>}
        {visibility && children}
        </>
    )
})

export default Togglable

