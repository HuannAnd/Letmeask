import copySvg from '@assets/copy.svg'

import './RoomCode.scss'
import { ButtonHTMLAttributes } from 'react';

type RoomCodeProps = {
	code: string; 
} & ButtonHTMLAttributes<HTMLButtonElement>

export function RoomCode({ code, ...props }: RoomCodeProps) {
	
	async function copyRoomCodeToClipboard() {
			navigator.clipboard.writeText(code);

	}
	
	return (
		<button {...props} className='room-tag' onClick={copyRoomCodeToClipboard}>
			<div>
				<img src={copySvg} alt="Copy icon" />
			</div>
			<span>{`Sala ${code}`}</span>
		</button>
	)
}