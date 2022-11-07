import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Navigate } from 'react-router-dom'
import { gameSearchResults } from '../api/game'

const Search = () => {
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const searchGame = (e) => {
        e.preventDefault()
        // window.location.href = "http://localhost:3000/games/search/" + `${name}`
        navigate(`/games/search/${name}`)
    }
    return (
    <div>
    <form onSubmit={searchGame} action="/games/search/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search all games</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Enter title here..."
            name="name"
            value={name}
            onChange={e => setName(e.target.value)} 
        />
        <button type="submit">Find game</button>
    </form>
    </div>
    )
}

export default Search;