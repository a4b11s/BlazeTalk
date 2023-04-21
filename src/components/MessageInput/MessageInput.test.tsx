import React from 'react';

import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MessageInput from './MessageInput';

describe('MessageInput component', () => {
    test('should be render', () => {
        render(<MessageInput onSend={() => {
        }}/>);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
    describe('send button should be disable and onSend not called', () => {
        test('if message empty', () => {
            render(<MessageInput onSend={() => {
            }}/>);
            expect(screen.getByRole('textbox')).toBeInTheDocument();
            expect(screen.getByRole('button')).toHaveAttribute('disabled');
        });
        test('if message white space', async () => {
            render(<MessageInput onSend={() => {
            }}/>);
            await waitFor(() => {
                // eslint-disable-next-line testing-library/no-wait-for-side-effects
                userEvent.type(screen.getByRole('textbox'), ' ');
            });

            expect(screen.getByRole('button')).toHaveAttribute('disabled');
        });
        test('if message white tab', async () => {
            render(<MessageInput onSend={() => {
            }}/>);
            await waitFor(() => {
                // eslint-disable-next-line testing-library/no-wait-for-side-effects
                userEvent.type(screen.getByRole('textbox'), '	');
            });
            expect(screen.getByRole('button')).toHaveAttribute('disabled');
        });
    });
    describe('should be call onSend', () => {
        test('if press send button', async () => {
            const onSend = jest.fn();
            render(<MessageInput onSend={onSend}/>);
            await waitFor(() => {
                // eslint-disable-next-line testing-library/no-wait-for-side-effects
                userEvent.type(screen.getByRole('textbox'), 'test-text');
                // eslint-disable-next-line testing-library/no-wait-for-side-effects
                userEvent.click(screen.getByRole('button'));
            });
            expect(onSend).toHaveBeenCalledTimes(1);
        });
        test('if press enter key', async () => {
            const onSend = jest.fn();
            render(<MessageInput onSend={onSend}/>);
            await waitFor(() => {
                // eslint-disable-next-line testing-library/no-wait-for-side-effects
                userEvent.type(screen.getByRole('textbox'), 'test-text');
                // eslint-disable-next-line testing-library/no-wait-for-side-effects
                userEvent.click(screen.getByRole('textbox'));
                // eslint-disable-next-line testing-library/no-wait-for-side-effects
                userEvent.keyboard('{ENTER}');
            });
            expect(onSend).toHaveBeenCalledTimes(1);
        });
    });
    test('should to match snapshot with correct props', () => {
        const view = render(<MessageInput onSend={() => {
        }}/>);
        expect(view).toMatchSnapshot();
    });
});
