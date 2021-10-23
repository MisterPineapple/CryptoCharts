import React from 'react'
import { signInWithGoogle } from '../service/firebase'
import { Button } from 'antd'

function AuthGoogle() {
    return (
        <div>
            <Button type="primary" onClick={signInWithGoogle}>Google</Button>
        </div>
    )
}

export default AuthGoogle
