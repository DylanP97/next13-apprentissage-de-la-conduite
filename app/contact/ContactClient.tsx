'use client'

import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ContactClientProps {
  currentUser: any
}

const ContactClient: React.FC<ContactClientProps> = ({ currentUser }) => {
  const firstName = currentUser.firstName ? currentUser.firstName : currentUser.name
  const email = currentUser.email
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSend = async () => {
    const data = { firstName, email, message }
    
    axios.post(`/api/contact`, { data })
      .then((res) => {
        var success: any = document.getElementById('success-message')
        success.style.display = 'block'
        success.innerHTML = "<p>Votre message a bien été envoyé! Vous pouvez retourner à la page d'accueil</p>"
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='home-container'>
      <Row>
        <Col className='' md="12" xl="12">
          <h1>Contact</h1>
          <Form action="" method="POST" onSubmit={handleSend}>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} onInput={((e: any) => setMessage(e.target.value))} />
            </Form.Group>
            <Form.Text className="errorzone" />
            <Button className='btn-10color' variant="primary" type="submit" id='checkout_btn'>Envoyé ma demande de contact</Button>
            <Form.Text id='success-message' />
            <hr />
            <a style={{ color: 'white' }} href="/">Revenir à la page d&apos;accueil</a>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default ContactClient