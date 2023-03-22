import copySvg from '@assets/copy.svg'

import './RoomCode.scss'

type RoomCodeProps = {
	code: string; 
}

export function RoomCode({ code }: RoomCodeProps) {
	
	async function copyRoomCodeToClipboard() {
			navigator.clipboard.writeText(code);

	}
	
	return (
		<button className='room-tag' onClick={copyRoomCodeToClipboard}>
			<div>
				<img src={copySvg} alt="Copy icon" />
			</div>
			<span>{`Sala ${code}`}</span>
		</button>
	)
}