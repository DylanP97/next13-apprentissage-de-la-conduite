'use client'

import { User } from "@prisma/client";

interface HomeGreetingProps {
    currentUser: User,
}

const HomeGreetings: React.FC<HomeGreetingProps> = ({ currentUser }) => {

    return (
        <p>Bonjour {currentUser.firstName ? currentUser.firstName : currentUser.name}</p>
    )
}

export default HomeGreetings;