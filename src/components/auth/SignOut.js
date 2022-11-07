import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const pageBody = {
    backgroundColor: 'rgb(241, 50, 50)',
    height: '50rem'
}

const boldText = {
    fontWeight: 'bold'
}

const signOutButton = {
    backgroundColor: 'black',
    fontWeight: 'bold',
    border: 'none'
}

const signOutText = {
    textAlign: 'center',
    fontFamily: 'Bungee Inline',
    color: 'white',
    fontWeight: 'bold'
}

const SignOut = (props) => {
	const { msgAlert, clearUser, user } = props

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
            <div style={pageBody} className='row'>
                <div className='col-sm-10 col-md-8 mx-auto mt-5' style={signOutText}>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h2 style={boldText}>Are you sure you want to sign out?</h2>
                    <br></br>
                    <small>We hate to see you go...</small><br/>
                    <br></br>
                    <ButtonGroup>
                        <Button style={signOutButton} onClick={onSignOut}>
                            Sign Out
                        </Button>
                        <Button style={boldText} variant='warning' onClick={onCancel}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
		</>
	)
}

export default SignOut
