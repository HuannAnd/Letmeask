import { useEffect, useState } from "react";

import { auth, database } from "@services/firebase";
import { useAuth } from "./useAuth";


type FirebaseQuestions = Record<string, {
	content: string,
	author: {
		name: string,
		avatar: string,

	},
	isHighlighted: boolean,
	isAnswered: boolean,
	likes: Record<string, {
		authorId: string
	}>

}>

type QuestionType = {
	id: string,
	content: string,
	author: {
		name: string,
		avatar: string,

	},
	isHighlighted: boolean,
	isAnswered: boolean,
	likeCount: number,
	hasLiked: boolean

}

export function useRoom(roomId: string) {
	const { user } = useAuth();
	const [questions, setQuestions] = useState<QuestionType[]>([]);
	const [title, setTitle] = useState('');

	useEffect(() => {
		const roomRef = database.ref(`/rooms/${roomId}`);

		roomRef.on('value', room => {
			const databaseRoom = room.val();
			const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

			const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
				return {
					id: key,
					content: value.content,
					author: value.author,
					isHighlighted: value.isHighlighted,
					isAnswered: value.isAnswered,
					likeCount: Object.values(value.likes ?? {}).length,
					hasLiked: Object.values(value.likes).some(like => like.authorId === user?.id)
				}
			});

			setTitle(databaseRoom.title)
			setQuestions(parsedQuestions);
			console.log(questions)

			return () => {
				roomRef.off('value')
			}

		})

	}, [roomId , user?.id])

	return { questions, title }
}