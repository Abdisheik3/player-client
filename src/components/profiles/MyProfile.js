import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

// import { signIn } from '../../api/auth'
// import messages from '../shared/AutoDismissAlert/messages'

import ProfileGameShow from './ProfileGameShow'
// import EditPlatformModal from './EditPlatformModal'
import PlatformForm from '../shared/PlatformForm'

// import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Badge, Modal, Container } from 'react-bootstrap'

// import apiUrl from '../../apiConfig'
import { myProfile, editPlatform, deletePlatform, addPlatform } from '../../api/profile'
// import { updatePlatform } from '../../api/profile'

const backgroundCSS = {
    backgroundColor: 'rgb(212, 212, 212)'
}

const profileInfo = {
    // display: 'flex',
    // justifyContent: 'center'
    marginLeft: '1rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    // textAlign: 'center'
}

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

const MyProfile = (props) => {

    const { msgAlert, user, setUser } = props

    const [platToEdit, setPlatToEdit] = useState(null)
    const [platEditShow, setPlatEditShow] = useState(false)
    const [newPlatShow, setNewPlatShow] = useState(false)

    const [platform, setPlatform] = useState({})

    const handleEditClose = () => setPlatEditShow(false);
    const handleNewClose = () => setNewPlatShow(false);


    const EditPlatform = (plat) => {

        setPlatToEdit(plat)

        setTimeout(setPlatEditShow(true), 100)
    }

    const NewPlatform = () => {
        setPlatform({})
        setTimeout(setNewPlatShow(true), 100)
    }



    const handleChange = (e) => {
        setPlatToEdit(prevPlatform => {
            const name = e.target.name
            let value = e.target.value

            const updatedPlatform = { [name]: value }

            return {
                ...prevPlatform, ...updatedPlatform
            }
        })
    }

    const handleNewChange = (e) => {
        setPlatform(prevPlatform => {
            const name = e.target.name
            let value = e.target.value

            const updatedPlatform = { [name]: value }

            return {
                ...prevPlatform, ...updatedPlatform
            }
        })
    }

    const handleEditSubmit = (evt) => {
        evt.preventDefault()

        editPlatform(user, platToEdit)
            .then(res => {

                setUser(res.data.user)
            })
            .then(() => handleEditClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Updated Platform Username',
                    variant: 'success'
                })
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Update Failure' + error,
                    variant: 'danger'
                })
            })
    }

    const handleDelete = () => {
        deletePlatform(user, platToEdit._id)
            .then(res => {
                setUser(res.data.user)
            })
            .then(() => handleEditClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Removed Platform Username',
                    variant: 'success'
                })
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Remove Failure' + error,
                    variant: 'danger'
                })
            })
    }

    const handleNewSubmit = (evt) => {
        evt.preventDefault()
        addPlatform(user, platform)
            .then(res => {
                setUser(res.data.user)
                setPlatform({})
            })
            .then(() => handleNewClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Added Platform Username',
                    variant: 'success'
                })
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Add Failure' + error,
                    variant: 'danger'
                })
            })
    }

    let gameCards
    let platforms
    if (user) {
        if (user.platforms.length > 0) {
            platforms = user.platforms.map((platform) => (
                <Badge key={platform._id} className='badge-primary badge-pill m-1' onClick={() => EditPlatform(platform)}>
                    {platform.platform}: {platform.name}
                </Badge>
            ))
        }
        if (user.myGames.length > 0) {

            gameCards = user.myGames.map(game => (

                <ProfileGameShow
                    key={game}
                    user={user}
                    msgAlert={msgAlert}
                    gameId={game}
                    mine={true}
                    setUser={setUser}
                />
            ))
        }
    }

    return (
        <>
        <div style={backgroundCSS}>
            
            <div style={profileInfo}>
            <h3>
                {user.thumbnail?
                <img src={user.thumbnail} style={thumbnailImg}/>
                :
                null
                }

                <br />
                Hello, {user.username}
                </h3 >
            <Button className="btn-sm m-1" onClick={NewPlatform}>Add a Platform Username</Button>
            { user && user.platforms.length > 0?
                <>
                <h6>My Gamer Tags:<small><i>(click to edit or remove)</i></small></h6>
                {platforms}
                
                </>
                :
                null
            }
            </div>
            <div style={ cardContainerLayout }>
            {gameCards }</div>
            
        </div>

{/* Modal for editing an existing username/platform */}
            {/* <div >

                <h3>
                    {user.thumbnail ?
                        <img src={user.thumbnail} style={thumbnailImg} />
                        :
                        null
                    }
                    <br />
                    Hello, {user.username}
                </h3 >
                <Button className="btn-sm m-1" onClick={NewPlatform}>Add a Platform Username</Button>
                {user && user.platforms.length > 0 ?
                    <>
                        <h6>My Gamer Tags:<small><i>(click to edit or remove)</i></small></h6>
                        {platforms}
                    </>
                    :
                    null
                }<div style={cardContainerLayout}>
                    {gameCards}</div>

            </div> */}
            {/* Modal for editing an existing username/platform */}
            <Modal show={platEditShow} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Platform Username</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PlatformForm
                        platform={platToEdit}
                        handleChange={handleChange}
                        handleSubmit={handleEditSubmit}
                        handleDelete={handleDelete}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditClose}>
                        Cancel
                    </Button>
 
                </Modal.Footer>
            </Modal>

            <Modal show={newPlatShow} onHide={handleNewClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Platform Username</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PlatformForm
                        platform={platform}
                        handleChange={handleNewChange}
                        handleSubmit={handleNewSubmit}
                        handleDelete={handleDelete}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleNewClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default MyProfile
