'use client'

import { useState } from 'react'
import SignUp from './InscriptionClient'
import SignIn from './ConnexionClient'

const ConnexionMain = () => {
    const [isSignIn, setIsSignIn] = useState(false);


    return (
        <div className='intro sign'>
            <SignUp isSignIn={isSignIn} state={setIsSignIn} />
            <SignIn isSignIn={isSignIn} state={setIsSignIn} />
        </div>
    )
};

export default ConnexionMain