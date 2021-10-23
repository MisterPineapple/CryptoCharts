import React from 'react'
import { signInWithFacebook } from '../service/firebase'
import { Button } from 'antd'

function AuthFacebook() {
    return (
        <div>
            <Button type="primary" onClick={signInWithFacebook}>Facebook</Button>
        </div>
    )
}

export default AuthFacebook
