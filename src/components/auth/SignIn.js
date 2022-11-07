import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TbDots } from 'react-icons';
import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const pageBody = {
    backgroundColor: 'rgb(241, 50, 50)',
    height: '50rem'
}

const signInText = {
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

const SignIn = (props) => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

	const onSignIn = (event) => {
		event.preventDefault()

		const { msgAlert, setUser } = props

        const credentials = {name, password}

		signIn(credentials)
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setName('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <div style={pageBody} className='row'>
            <div className='col-sm-10 col-md-4 mx-auto mt-5' style={bungeeFont}>
                
                <br></br>
                <br></br>
                <br></br>
                <div>
                </div>
                <h3 style={signInText}>Sign In</h3>
                <Form onSubmit={onSignIn}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email address or Username</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            name='name'
                            value={name}
                            placeholder='Enter email or username'
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <div style={buttonCenter}>
                    <Button style={boldText} variant='primary' type='submit'>
                        Submit
                    </Button>
                    </div>
                    <br></br>
                   
                </Form>
            </div>
        </div>
    )
}

export default SignIn