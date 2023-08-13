'use client'

import React from 'react'
import { Button } from 'react-bootstrap';
import { toast } from "react-hot-toast";
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface PlanCardProps {
    label: string;
    priceLabel: string;
    planId: number;
    features: any;
    userId: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
    label,
    priceLabel,
    planId,
    features,
    userId
}) => {

    const router = useRouter()

    const transformToBody = (itemNumber: number) => {
        const body = JSON.stringify({
            items: [
                { id: itemNumber, quantity: 1 },
            ],
            userId: userId
        })

        return body
    }

    const handleClick = async (itemNumber: number) => {
        console.log(itemNumber)
        axios.post(`http://localhost:3000/api/stripe`, transformToBody(itemNumber))
            .then(response => {
                const url = response.data.message
                router.push(url)
                toast.success('blablabla')
            }).catch(e => {
                console.error(e.error)
                toast.error(e.error)
            })
    }

    console.log(
    )

    return (
        <div className="plan">
            <h2 className="plan-title">{label}</h2>
            <div className="plan-price">{priceLabel}/mois</div>
            <ul className="plan-features">
                {
                    features.map((feature: string, index: any) => {
                        return <li key={index + 'feature' + planId}>{feature}</li>
                    })
                }
            </ul>
            <br />
            <Button onClick={() => { handleClick(planId) }} className="plan-btn">S&apos;abonner </Button>
        </div>
    )
}

export default PlanCard