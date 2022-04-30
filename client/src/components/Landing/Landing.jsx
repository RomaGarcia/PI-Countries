import React from 'react';
import { Link } from 'react-router-dom';
import s from './Landing.module.css';

export default function Landing() {
    return (
        <div className={s.container}>
            <h2>Countries</h2>
            <Link to='/home'>
                <button className={s.cta}>
                    <span>START</span>
                    <svg viewBox="0 0 13 10" height="10px" width="15px">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                </button>
            </Link>
        </div>
    )
}