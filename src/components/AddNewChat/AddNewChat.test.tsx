import React from 'react';

import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddNewChat from './AddNewChat';

describe('AddNewChat component', () => {
    test('should be show when isAddingNewChat = true', () => {
        render(
            <AddNewChat
                isAddingNewChat={true}
                onAddingModalClose={() => {
                }}
                onAddComplete={() => {
                }}
            />
        );
        expect(screen.getByTestId('wrapper')).toHaveStyle('visibility: visible;');
    });
    test('should be hidden when isAddingNewChat = false', () => {
        render(
            <AddNewChat
                isAddingNewChat={false}
                onAddingModalClose={() => {
                }}
                onAddComplete={() => {
                }}
            />
        );
        expect(screen.getByTestId('wrapper')).toHaveStyle('visibility: hidden;');
    });
    test('avatar preview should be work', async () => {
        render(
            <AddNewChat
                isAddingNewChat={false}
                onAddingModalClose={() => {
                }}
                onAddComplete={() => {
                }}
            />
        );
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-wait-for-side-effects
            userEvent.type(screen.getByTestId('avatar-url-input'), 'test url');
        });
        expect(screen.getByRole('img', {hidden: true})).toHaveAttribute(
            'src',
            'test url'
        );
    });
    test('create button should be disable if the name contains less than 3 letters', async () => {
        render(
            <AddNewChat
                isAddingNewChat={true}
                onAddingModalClose={() => {
                }}
                onAddComplete={() => {
                }}
            />
        );
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-wait-for-side-effects
            userEvent.type(screen.getByTestId('chat-name-input'), 'te');
        });
        expect(screen.getByTestId('create-btn')).toBeDisabled();
    });
    test('create button should be disable if the name contains only white space', async () => {
        render(
            <AddNewChat
                isAddingNewChat={true}
                onAddingModalClose={() => {
                }}
                onAddComplete={() => {
                }}
            />
        );
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-wait-for-side-effects
            userEvent.type(screen.getByTestId('chat-name-input'), '   ');
        });
        expect(screen.getByTestId('create-btn')).toBeDisabled();
    });
    test('create button should not be disable if the name contains more than 3 letters', async () => {
        render(
            <AddNewChat
                isAddingNewChat={true}
                onAddingModalClose={() => {
                }}
                onAddComplete={() => {
                }}
            />
        );
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-wait-for-side-effects
            userEvent.type(screen.getByTestId('chat-name-input'), 'tes');
        });
        expect(screen.getByTestId('create-btn')).not.toBeDisabled();
    });
    test('onAddingModalClose should be call', async () => {
        const onAddingModalClose = jest.fn();
        render(
            <AddNewChat
                isAddingNewChat={true}
                onAddingModalClose={onAddingModalClose}
                onAddComplete={() => {
                }}
            />
        );
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-wait-for-side-effects
            userEvent.click(screen.getByTestId('close-btn'));
        });
        expect(onAddingModalClose).toBeCalled();
    });
    test('onAddComplete should be call with correct data', async () => {
        const testData = {name: 'test chat name', chatAvatar: 'test avatar url'};
        const onAddComplete = jest.fn();
        render(
            <AddNewChat
                isAddingNewChat={true}
                onAddingModalClose={() => {
                }}
                onAddComplete={onAddComplete}
            />
        );
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-wait-for-side-effects
            userEvent.type(screen.getByTestId('chat-name-input'), testData.name);
        });
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-wait-for-side-effects
            userEvent.type(screen.getByTestId('avatar-url-input'), testData.chatAvatar);
        });
        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-wait-for-side-effects
            userEvent.click(screen.getByTestId('create-btn'));
        });
        expect(onAddComplete).toBeCalledWith(testData);
    });
    test('should to match snapshot', () => {
        const view = render(
            <AddNewChat
                isAddingNewChat={true}
                onAddingModalClose={() => {
                }}
                onAddComplete={() => {
                }}
            />
        );
        expect(view).toMatchSnapshot();
    });
});
