import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

/* A preserved example
test("renders learn react link", () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
*/

test("register a user", () => {
    render(<App />);

    {
        const registerButton = screen.getByText(/register/i);
        expect(registerButton).toBeInTheDocument();
        fireEvent.click(registerButton);
    }

    {
        fireEvent.change(screen.getByPlaceholderText(/username/i), {
            target: { value: "testbot" }
        });
        fireEvent.change(screen.getByPlaceholderText(/first name/i), {
            target: { value: "test" }
        });
        fireEvent.change(screen.getByPlaceholderText(/e-mail/i), {
            target: { value: "test@test.com" }
        });
        fireEvent.change(screen.getByPlaceholderText(/pin/i), {
            target: { value: "123" }
        });
        fireEvent.click(screen.getByText(/done/i));
        expect(screen.getByText(/success!/i)).toBeInTheDocument();
    }
});
