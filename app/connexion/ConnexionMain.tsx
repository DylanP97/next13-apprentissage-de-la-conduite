'use client'

import { useState } from 'react'
import SignUp from './InscriptionClient'
import SignIn from './ConnexionClient'

const ConnexionMain = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <div className={`intro sign`}>
            <SignIn isSignIn={isSignIn} state={setIsSignIn} />
            <SignUp isSignIn={isSignIn} state={setIsSignIn} />
        </div>
    )
};

export default ConnexionMain