import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import ReviewForm from "../shared/ReviewForm"
import { createReview } from "../../api/review"

const NewReviewModal = (props) => {
    const {
        user, game, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [review, setReview] = useState({})

    const handleChange = (e) => {
        setReview(prevReview => {
            const name = e.target.name
            let value = e.target.value

            const updatedReview = { [name]: value }

            return {
                ...prevReview, ...updatedReview
            }
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        createReview(user, game.id, review)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: 'Review Created!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong! Please try again',
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={ show } onHide= { handleClose }>
            <Modal.Header closeButton />
            <Modal.Body>
                <ReviewForm 
                    review={review}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Give this game a review!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewReviewModal