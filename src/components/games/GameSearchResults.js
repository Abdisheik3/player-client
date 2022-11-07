import React, { useEffect, useState } from 'react'
import { Container, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { gameSearchResults } from '../../api/game'
import Spinner from 'react-bootstrap/Spinner'
import GameSearchShow from './GameSearchShow'

const backgroundCSS = {
    backgroundColor: 'rgb(212, 212, 212)',
    // backgroundColor: 'rgb(120, 219, 111)',
}

const spinnerCSS = {
    marginLeft: '15%',
}


const findingResult = {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginTop: '30%',
    fontSize: '200%',
    color: 'rgb(241, 50, 50)'
}

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const GameSearch = ({ user, msgAlert }) => {
    // useEffect(() => {
    //     setRenderSearch(true)
    // },[])

    const [allGames, setAllGames] = useState([])
    const [searchedGame, setSearchedGame] = useState(null)
    const { name } = useParams()
    let searchTerm

    // let allGames
    useEffect(() => {
        gameSearchResults(user, name)
            .then((res) => {
                setSearchedGame(name)
                let games = res.data.results.map((game) => (
                    <GameSearchShow
                        key={game.id}
                        name={game.name}
                        image={game.image.thumb_url}
                        id={game.id}
                    // game = {game}
                    />
                ))

                return games
            })


            .then(games => {

                setAllGames(games)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Failure to find games ' + error,
                    variant: 'danger'
                })
            })
    }, [name != searchedGame])

    if (!allGames) {
        return (
            <>
                <div style={backgroundCSS}>
                    <Container style={findingResult}>
                        <p>Finding game</p>
                        <p>
                            <Spinner animation='border' style={spinnerCSS}>
                            </Spinner>
                        </p>
                    </Container>
                </div>
            </>
        )
    }

    return (
        <>
        <div style={cardContainerLayout}>
            {allGames}
        </div>
            
        </>
    )
}

export default GameSearch