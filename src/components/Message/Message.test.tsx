import React from 'react';

import { render, screen } from '@testing-library/react';

import { IMessage, IUser } from '../../models';

import Message from './Message';

const testMessage: IMessage = {
	text: 'TEST MESSAGES',
	uid: 'TEST UID',
	chatUid: 'TEST CHAT UID',
	author: {
		uid: 'TEST USER UID',
	},
};
const testUser: IUser = {
	uid: 'TEST USER UID',
	email: 'TEST EMAIL',
	photoURL: 'TEST PHOTO URL',
	displayName: 'TEST DISPLAY NAME',
};
const IncorrectTestUser: IUser = {
	uid: '',
	email: '',
	photoURL: '',
	displayName: '',
};

describe('Message component', () => {
	describe('should be render with correct props', () => {
		test('message should be rendered', () => {
			render(
				<Message
					message={testMessage}
					author={testUser}
					isAuthor={true}
					isLast={false}
				/>
			);
			expect(screen.getByText(testMessage.text)).toBeInTheDocument();
		});
		test('author name should be rendered', () => {
			render(
				<Message
					message={testMessage}
					author={testUser}
					isAuthor={true}
					isLast={false}
				/>
			);
			expect(screen.getByText(testUser.displayName)).toBeInTheDocument();
		});
	});
	describe('should not be error without correct props', () => {
		describe('should not be render without correct messages', () => {
			test('message is empty', () => {
				render(
					<Message
						message={{ ...testMessage, text: '' }}
						author={testUser}
						isAuthor={true}
						isLast={false}
					/>
				);
				expect(screen.queryByTestId('message-wrapper')).toBeNull();
				expect(screen.queryByTestId('message-text')).toBeNull();
			});
			test('message is white space', () => {
				render(
					<Message
						message={{ ...testMessage, text: ' ' }}
						author={testUser}
						isAuthor={true}
						isLast={false}
					/>
				);
				expect(screen.queryByTestId('message-wrapper')).toBeNull();
				expect(screen.queryByTestId('message-text')).toBeNull();
			});
			test('message is tab', () => {
				render(
					<Message
						message={{ ...testMessage, text: '	' }}
						author={testUser}
						isAuthor={true}
						isLast={false}
					/>
				);
				expect(screen.queryByTestId('message-wrapper')).toBeNull();
				expect(screen.queryByTestId('message-text')).toBeNull();
			});
		});
		test('should not be render without correct user', () => {
			render(
				<Message
					message={testMessage}
					author={IncorrectTestUser}
					isAuthor={true}
					isLast={false}
				/>
			);
			expect(screen.queryByTestId('message-wrapper')).toBeNull();
		});
	});
	test('should to match snapshot with correct props', () => {
		const view = render(
			<Message
				message={testMessage}
				author={testUser}
				isAuthor={true}
				isLast={false}
			/>
		);
		expect(view).toMatchSnapshot();
	});
});
