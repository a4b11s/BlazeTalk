export interface IUser {
	displayName: string;
	email: string;
	uid: string;
	photoURL: string;
}

export interface IChat {
	lastMessage: string;
	uid: string;
	name: string;
	chatAvatar: string;
}

export interface IMessage {
	chatUid: string;
	uid: string;
	author: {
		uid: string;
	};
	text: string;
	images?: Array<string>;
}
