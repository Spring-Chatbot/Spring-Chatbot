import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

/* A preserved example
test("renders learn react link", () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
*/

test("register a user", () => {
    const utils = render(<App />);

    {
        const registerButton = utils.getByText(/register/i);
        expect(registerButton).toBeInTheDocument();
        fireEvent.click(registerButton);
    }

    {
        fireEvent.change(utils.getByPlaceholderText(/username/i), {
            target: { value: "testbot" }
        });
        fireEvent.change(utils.getByPlaceholderText(/first name/i), {
            target: { value: "test" }
        });
        fireEvent.change(utils.getByPlaceholderText(/e-mail/i), {
            target: { value: "test@test.com" }
        });
        fireEvent.change(utils.getByPlaceholderText(/pin/i), {
            target: { value: "123" }
        });
        fireEvent.click(utils.getByText(/done/i));
        expect(utils.getByText(/success!/i)).toBeInTheDocument();
    }
});

test("login a user", () => {
    const utils = render(<App />);

    // Apparently, the previous test interferes with this one and I do not know how to restart the session
    if (utils.getByText(/login/i)) {
        fireEvent.click(utils.getByText(/login/i));
    }

    const loginButton = utils.getByText(/Sign in/);
    expect(loginButton).toBeInTheDocument();

    {
        fireEvent.change(utils.getByPlaceholderText(/username/i), {
            target: { value: "testbot" }
        });

        fireEvent.change(utils.getByPlaceholderText(/pin/i), {
            target: { value: "123" }
        });
    }

    fireEvent.click(loginButton);

    {
        const messageBox = utils.getByPlaceholderText(/what's on your mind/i);
        expect(messageBox).toBeInTheDocument();
    }
});

test("send a message", () => {
    const utils = render(<App />);

    {
        fireEvent.change(utils.getByPlaceholderText(/what's on your mind/i), {
            target: { value: "Test message" }
        });
    }

    const submitButton = utils.getByText(/submit/i);
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);

    expect(utils.getByText(/flerp/i)).toBeInTheDocument();
});
