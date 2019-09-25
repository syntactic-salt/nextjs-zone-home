import React from 'react';
import App from 'next/app';
import AppShell from 'nextjs-app-shell';

class HomeApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <AppShell>
                <Component {...pageProps} />
            </AppShell>
        );
    }
}

export default HomeApp;
