// import React, { Component } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const pageBody = {
    backgroundColor: 'rgb(241, 50, 50)',
    height: '50rem'
}

const bungeeFont = {
    fontFamily: 'Bungee Inline',
    fontWeight: 'bold',
    marginTop: '5px',
    color: 'white'
}

const welcomeText = {
    textAlign: 'center',
    fontFamily: 'Bungee Inline',
    color: 'white'
}

const boldText = {
    fontWeight: 'bold'
}

const submitButtonStyle = {
    border: 'none',
    marginTop: '1rem',
    borderRadius: '15%',
    fontWeight: 'bold',
    height: '3rem',
    width: '6rem'
}

const buttonCenter = {
    textAlign: 'center'
}


const SignUp = (props) => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const navigate = useNavigate()

	const onSignUp = (event) => {
		event.preventDefault()

		const { msgAlert, setUser } = props

        const credentials = {username, email, password, passwordConfirmation}

        credentials.name = username

		signUp(credentials)
			.then(() => signIn(credentials))
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign Up Success',
					message: messages.signUpSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setUsername('')
                setEmail('')
                setPassword('')
                setPasswordConfirmation('')
				msgAlert({
					heading: 'Sign Up Failed with error: ' + error.message,
					message: messages.signUpFailure,
					variant: 'danger',
				})
			})
	}


    return (
        <div className='row' style={ pageBody }>
            <div className='col-sm-10 col-md-8 mx-auto mt-5' style={bungeeFont}>
                <div style={welcomeText}>
                <h3 style={boldText}>Welcome to GameShare!</h3>
                <h6 style={boldText}>Create your account below</h6>
                </div>
                <Form onSubmit={onSignUp}>
                <Form.Group >
                        <Form.Label style={bungeeFont}>Username</Form.Label>
                        <Form.Control
                            required
                            type='strings'
                            name='username'
                            value={username}
                            pattern="[^@]+"
                            title="Username cannot include '@'"
                            placeholder='Enter username'
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label style={bungeeFont}>Email address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label style={bungeeFont}>Password</Form.Label>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='passwordConfirmation'>
                        <Form.Label style={bungeeFont}>Password Confirmation</Form.Label>
                        <Form.Control
                            required
                            name='passwordConfirmation'
                            value={passwordConfirmation}
                            type='password'
                            placeholder='Confirm Password'
                            onChange={e => setPasswordConfirmation(e.target.value)}
                        />
                    </Form.Group>
                    <div style={buttonCenter}>
                    <Button style={ submitButtonStyle } variant='primary' type='submit'>
                        Submit
                    </Button>
                    </div>
                </Form>
            </div>
        </div>
    )

}

export default SignUp