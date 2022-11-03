import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteReview } from '../../api/review'
import EditReviewModal from './EditReviewModal'

const ShowReview = (props) => {
    const { review, game, user, msgAlert, triggerRefresh } = props
    console.log('this is the props', props)

    const [editModalShow, setEditModalShow] = useState(false)

    const destroyReview = () => {
        deleteReview(user, review._id, game._id)
            .then(() => {
                msgAlert({
                    heading: 'Review deleted!',
                    message: 'Review has been deleted!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2" >
                <Card.Header>{ review.comment }</Card.Header>
                <Card.Body>
                    <small>{ review.score }</small><br/>
                </Card.Body>
                <Card.Footer>
                    { 
                        user && game.owner && user._id === game.owner._id 
                        ?
                        <>
                            <Button
                                className="m-2" 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}  
                            >
                                Edit Review
                            </Button>
                            <Button 
                                className="m-2"
                                variant="danger"
                                onClick={() => destroyReview()}
                            >
                                Delete Review
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditReviewModal 
                user={user}
                game={game}
                review={review}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
            />
        </>
    )
}

export default ShowReview