import React from 'react';

import { fn, mock } from '@wdio/browser-runner'
import { render } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

mock('@auth0/auth0-react', async (origModuleFactory) => {

    // Comment this line and test passes
    const originalModule = await origModuleFactory()

    return {
        __esModule: true,
        // Comment this line and test passes
        ...originalModule,
        useAuth0: fn(),
    }
})


describe('Mock', () => {
    it('can import original module with factory ', async () => {

        useAuth0.mockResolvedValue({
          isAuthenticated: true,
          user: {
            name: "John",
            email: "johndoe@example.com",
            email_verified: true,
            sub: "google-oauth2|12345678901234",
          },
          isLoading: false
        })

        render(<BrowserRouter />)
    });

})
