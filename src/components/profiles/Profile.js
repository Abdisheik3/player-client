import React, { useState, useEffect } from 'react'
import ProfileGameShow from './ProfileGameShow'
import { Badge } from 'react-bootstrap'
import { viewProfile } from '../../api/profile'
import { useParams } from 'react-router-dom'

const thumbnailImg = {
    borderRadius: '50%',
    height: '150px',
    width: '150px'
}

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const Profile = (props) => {
    const { msgAlert, user } = props
    const [otherUser, setOtherUser] = useState(null)
    const [otherUserLoaded, setOtherUserLoaded] = useState(false)
    const { otherUsername } = useParams()

    useEffect(() => {
        viewProfile(user, otherUsername)
            .then(res => {
                setOtherUser(
                    {
                        platforms: res.data.user.platforms,
                        thumbnail: res.data.user.thumbnail,
                        username: res.data.user.username,
                        myGames: res.data.user.myGames
                    }
                )
            })
            .then(() => {
                setTimeout(setOtherUserLoaded(true), 500)

            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Failed to find profile ' + error,
                    variant: 'danger'
                })
            })
    }, [])


    let gameCards
    let platforms
    if (otherUserLoaded) {
        if (otherUser.platforms.length > 0) {
            platforms = otherUser.platforms.map((platform) => (
                <Badge key={platform._id} className='badge-primary badge-pill m-1'>
                    {platform.platform}: {platform.name}
                </Badge>
            ))
        }

        if (otherUser.myGames.length > 0) {

            gameCards = otherUser.myGames.map(game => (

                <ProfileGameShow
                    key={game}
                    user={user}
                    msgAlert={msgAlert}
                    gameId={game}
                // setUser={setUser}
                />

            ))
        }
    }

    if (!otherUserLoaded) {
        return (<>Loading...</>)
    }
    else {
        return (

            <>
                <div >

                    <h3>
                        {otherUser.thumbnail ?
                            <img src={otherUser.thumbnail} style={thumbnailImg} />
                            :
                            null
                        }
                        <br />
                        {otherUser.username}'s Profile</h3 >
                    {otherUser && otherUser.platforms.length > 0 ?
                        <>
                            <h6>{otherUser.username}'s Gamer Tags:</h6>
                            {platforms}

                        </>
                        :
                        null
                    }<div style={cardContainerLayout}>
                        {gameCards}</div>

                </div>

            </>
        )
    }
}

export default Profile
