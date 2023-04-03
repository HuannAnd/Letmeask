import { ReactNode } from 'react';

import './Question.scss';

import userDefault from '@assets/user-default.svg';

type QuestionProps = {
  author?: {
    name: string,
    avatar: string
  },
  content?: string,
  children: ReactNode,
  isAnswered?: boolean,
  isHighlighted?: boolean
}

export function Question({
  author,
  content,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) {
  return (
    <div className={`Question ${isHighlighted && !isAnswered ? 'highlight' : ''} ${isAnswered ? 'answered' : ''}`}>
      <p>{content}</p>
      <div className="info">
        <div className='user-info'>
          <div className={`${!author?.avatar && "default"}`}>
            <img src={!author?.avatar ? userDefault : author.avatar} alt={`Profile image of ${author?.name}`} />
          </div>
          <span>{author?.name}</span>
        </div>
        <div className="question-options">
          {children}
        </div>
      </div>
    </div>
  )
}