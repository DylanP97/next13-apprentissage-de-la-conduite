'use client'

import React, { useContext, useEffect } from 'react'

interface HomeGreetingProps {
    currentUser: any,
}

const HomeGreetings: React.FC<HomeGreetingProps> = ({ currentUser }) => {

    return (
        <p>
            Bonjour {currentUser.firstName ? currentUser.firstName : currentUser.name}
        </p>
    )
}

export default HomeGreetings;