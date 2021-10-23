import React, { useEffect, useState } from 'react'
import {Button} from 'antd'
import firebase from '../../service/firebase'
import { Modal } from 'antd';
import AuthGoogle from '../../auth/AuthGoogle';
import AuthFacebook from '../../auth/AuthFacebook';

function Login() {
    const [user, setUser] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          setUser(user)
          setIsModalVisible(false)
        }
      })
    }, [])
  
    const logout = () => {
        firebase.auth().signOut().then(function() {
            setUser()
            // Sign-out successful.
          }).catch(function(error) {
            console.log('cannot logout')
          });
    }

    console.log(user);
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
            {user ? <Button onClick={() => logout()}>
                Logout
            </Button> : <Button type="primary" onClick={showModal}>Sign in</Button>}

            <Modal 
                title="Login" 
                visible={isModalVisible} 
                footer={[<Button key="back" onClick={handleCancel}>
                            Cancel
                        </Button>,
                        ]}
            >
                <AuthFacebook />
                <AuthGoogle />
                <p>Some contents...</p>
            </Modal>
        </div>
        
    )
}

export default Login
