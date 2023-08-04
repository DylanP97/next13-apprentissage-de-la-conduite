import React from 'react'
import { Form, FloatingLabel } from 'react-bootstrap';

interface ArticleEditionSimpleInputProps {
    label?: string;
    instruction?: string;
    data?: string;
    state?: any;
}

export const ArticleEditionSimpleInput: React.FC<ArticleEditionSimpleInputProps> = ({ label, instruction, data, state }) => {

    return (
        <Form.Group className="w-100">
            <Form.Label>{instruction}</Form.Label>
            <br />
            <FloatingLabel label={"Titre de l'article"}>
                <Form.Control
                    required
                    type="text"
                    name="title"
                    id="title"
                    placeholder={`Ajouter un ${label}`}
                    onChange={(event) => state(event.target.value)}
                    defaultValue={data || ''}
                />
            </FloatingLabel>
        </Form.Group>

    )
}