import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const pageBody = {
    backgroundColor: 'rgb(241, 50, 50)',
    height: '50rem'
}

const changePasswordText = {
    textAlign: 'center',
    fontFamily: 'Bungee Inline',
    color: 'white',
    fontWeight: 'bold'
}

const bungeeFont = {
    fontFamily: 'Bungee Inline',
    fontWeight: 'bold',
    color: 'white'
}

const boldText = {
    fontWeight: 'bold'
}

const buttonCenter = {
    marginTop: '1rem',
    textAlign: 'center',
    borderRadius: '15%',
}

const ChangePassword = (props) => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const navigate = useNavigate()

	const onChangePassword = (event) => {
		event.preventDefault()

		const { msgAlert, user } = props
        const passwords = {oldPassword, newPassword}

		changePassword(passwords, user)
			.then(() =>
				msgAlert({
					heading: 'Change Password Success',
					message: messages.changePasswordSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
				setOldPassword('')
                setNewPassword('')
				msgAlert({
					heading: 'Change Password Failed with error: ' + error.message,
					message: messages.changePasswordFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <div className='row' style={pageBody}>
            <div className='col-sm-10 col-md-8 mx-auto mt-5' style={bungeeFont}>
                <h3 style={changePasswordText}>Change Password</h3>
                <Form onSubmit={onChangePassword}>
                    <Form.Group controlId='oldPassword'>
                        <Form.Label>Old password</Form.Label>
                        <Form.Control
                            required
                            name='oldPassword'
                            value={oldPassword}
                            type='password'
                            placeholder='Old Password'
                            onChange={e => setOldPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='newPassword'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            required
                            name='newPassword'
                            value={newPassword}
                            type='password'
                            placeholder='New Password'
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                    <div style={buttonCenter}>
                    <Button style={boldText} variant='primary' type='submit'>
                        Submit
                    </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default ChangePassword