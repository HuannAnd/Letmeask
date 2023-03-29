import { FormEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import logo from '@assets/logo.svg'
import emptyImg from '@assets/empty-questions.svg'

import { Button, Question, RoomCode } from '@components/index'

import { database } from '@services/firebase'

import './AdminRoom.scss';

import { useAuth } from '@hooks/useAuth'
import { useRoom } from '@hooks/useRoom'


type ParamsType = {
  id: string
}

export function AdminRoom() {
  // const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams<ParamsType>();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId!)

  async function handleCloseRoom() {
    if(window.confirm("Você tem certeza que quer fechar essa sala?")) {
      await database.ref(`/rooms/${roomId}`).update({
        endedAt: new Date(),
      })
    }

    navigate("/")
  }

  async function handleQuestionDelete(questionId: string) {
    if(window.confirm("Você tem certeza que quer deletar essa pergunta?")) {
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <nav>
        <img src={logo} alt="Letmeask" />
        <div className='nav-options'>
          <RoomCode code={roomId!} />
          <Button onClick={handleCloseRoom} isOutlined>Encerrar sala</Button>

        </div>
      </nav>

      <main>
        <div className='room-title'>
          <h2>{`Sala: ${title}`}</h2>
          {questions.length > 0 && <span>{`${questions.length} pergunta(s)`}</span>}
        </div>
        {questions.length > 0 ? (
          questions.map(({ author, content, id }) => {
            return (<Question
              key={id}
              author={author}
              content={content}
            >
              <button className='delete-button' onClick={() => handleQuestionDelete(id)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5.99988H5H21" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </Question>
            )
          }
          )
        ) : (
          <div className='empty-section'>
            <img src={emptyImg} alt="Empty question image" />
            <h3>Nenhuma pergunta por aqui...</h3>
            <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
          </div>
        )
        }

      </main>
    </div>
  )

}