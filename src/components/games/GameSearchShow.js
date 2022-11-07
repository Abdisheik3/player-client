import React, { useEffect, useState } from 'react' 
import { Container, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { gameSearchResults } from '../../api/game'
import Spinner from 'react-bootstrap/Spinner'
import { useNavigate } from 'react-router-dom'

const backgroundCSS = {
    backgroundColor: 'rgb(212, 212, 212)',
    // backgroundColor: 'rgb(120, 219, 111)',
    display: 'flex',
    justifyContent: 'center',
}

const cardHeader = {
    fontFamily: 'Bungee Inline',
}

const cardBody = {
    width: '100%',
    height: '100%',
}

const spinnerCSS = {
    marginLeft: '15%',
}

const boldText = {
    fontWeight: 'bold'
}

const cardCSS = {
    marginTop: '20px',
    marginBottom: '20px',
    width: '15rem',
    height: '19rem',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '2.5%'
}

const findingResult = {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginTop: '30%',
    fontSize: '200%',
    color: 'rgb(241, 50, 50)'
}

const imageDisplay = {
    height: '90%',
    width: '90%'
}

const GameSearchShow = (props) => {
const { name, image, id } = props
const navigate = useNavigate()

    if (!name) {
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
    )}

    return (
        <>
        <div style={backgroundCSS}>
			<Container className="fluid" onClick={() => navigate(`/games/${id}`)}>
                <Card style={cardCSS}>
                <Card.Header style={cardHeader}>
                    <h3 style={boldText}>{ name }</h3>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div style={cardBody}>
                        <img src={ image } />
                        </div>
                    </Card.Text>
                </Card.Body>
                </Card>
            </Container>
        </div>
        
        </>

    )

}

export default GameSearchShow