import { FormEvent , useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import ilustrationImg from '@assets/ilustration.svg'
import logo from '@assets/logo.svg'

import './NewRoom.scss'

import { Button } from '@components/index'

import { useAuth } from '@hooks/useAuth'
import { useRoom } from '@hooks/useRoom'

import { database } from '@services/firebase'


export function NewRoom() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [newRoom, setNewRoom] = useState('');


    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if(newRoom.trim() === '') {
            return
        }
        

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        navigate(`/rooms/${firebaseRoom.key}`)

    }
    
    return (
        <div id='page-auth'>
        <aside>
            <img src={ilustrationImg} alt="an image of interaction" />
            <strong>Toda pergunta tem uma resposta</strong>
            <p>aprenda e compartilhe conhecimento com outras pessoas</p>
        </aside>
        <main>
            <div className='main-content'>
                <img className='logo' src={logo} alt="Letmeask logo" />
                <h2>Crie uma nova sala</h2>
                <form onSubmit={handleCreateRoom}>
                    <input 
                        type="text" 
                        placeholder='Nome da sala'
                        onChange={event => setNewRoom(event.target.value)}
                    />
                    <Button type='submit'>Criar Sala</Button>
                </form>
                <p>
                    Quer entrar em uma sala já existente? <Link to='/'>Clique aqui</Link>
                </p>
            </div>
        </main>

    </div>
    )
}