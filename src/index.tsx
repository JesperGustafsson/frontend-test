import * as React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import {useState, useEffect} from 'react';

const App2: React.FC = () => <div>Currency converter</div>;


render(
    <>
    <App />
    </>, document.getElementById('app')
);
