import { FormEvent , useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ilustrationImg from '@assets/ilustration.svg'
import logo from '@assets/logo.svg'
import googleIconImg from '@assets/google-icon.svg'

import { Button } from '@components/index'

import './Home.scss'

import { database } from '@services/firebase'

import { useAuth } from '@hooks/useAuth';

export function Home () {
    const navigate = useNavigate();
    const { user , signWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if(!user) {
            await signWithGoogle()
        }

        navigate('/rooms')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if(!roomRef.exists()) {
            alert('Room does not exists.')
            return;
        }

        navigate(`/rooms/${roomCode}`)
        
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
                    <button onClick={handleCreateRoom} className='btn-google'>
                        <img src={googleIconImg} alt="Google icon" />
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form action="" onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder='Digite o código da sala'
                            onChange={(event) => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type='submit'>
                            <img src="" alt="" />
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>

        </div>

    );
}
