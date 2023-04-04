import { FormEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import logo from '@assets/logo.svg'

import checkImg from '@assets/check.svg'
import commentImg from '@assets/comment.svg'
import deleteImg from '@assets/delete.svg'
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
    if (window.confirm("Você tem certeza que quer fechar essa sala?")) {
      await database.ref(`/rooms/${roomId}`).update({
        endedAt: new Date(),
      })
    }

    navigate("/")
  }

  async function handleQuestionDelete(questionId: string) {
    if (window.confirm("Você tem certeza que quer deletar essa pergunta?")) {
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update(
      {
        isAnswered: true,
      }
    );

  }

  async function handleHighlightQuestion(questionId: string) {
    console.log('passou na função')
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update(
      {
        isHighlighted: true,
      }
    );
  }

  return (
    <div id="page-room">
      <nav>
        <img src={logo} alt="Letmeask" />
        <div className='nav-options'>
          <RoomCode title='Copy code' code={roomId!} />
          <Button onClick={handleCloseRoom} isOutlined>Encerrar sala</Button>
        </div>
      </nav>

      <main>
        <div className='room-title'>
          <h2>{`Sala: ${title}`}</h2>
          {questions.length > 0 && <span>{`${questions.length} pergunta(s)`}</span>}
        </div>
        {questions.length > 0 ? (
          questions.map(({ author, content, id, isAnswered, isHighlighted }) => {
            return (<Question
              key={id}
              author={author}
              content={content}
              isAnswered={isAnswered}
              isHighlighted={isHighlighted}
            >
              {!isAnswered && (
                <>
                  <button className='delete-button' onClick={() => handleCheckQuestionAsAnswered(id)}>
                    <img src={checkImg} alt="Check highlighter" />
                  </button>
                  <button className='delete-button' onClick={() => handleHighlightQuestion(id)}>
                    <img src={commentImg} alt="" />
                  </button>
                </>
              )}
              <button className='delete-button' onClick={() => handleQuestionDelete(id)}>
                <img src={deleteImg} alt="" />
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