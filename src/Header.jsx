import * as React from 'react';
import {color, scale, typeScale} from './styles/variables'

export const Header = ({totalBets, onClick}) => (
    <header style={container}>
        <img style={logo} src={'/images/logo.png'} alt='logo'/>
        <button onClick={() => onClick('betslips')} style={button}>{totalBets} bets</button>
    </header>
)

const container = {
    padding: scale.s3,
    paddingBottom: 0,
    display: 'flex',
    textAlign: 'center',
    background: color.black,
}

const logo = {
    width: 120,
    height: 19,
}

const button = {
    background: color.yellow,
    color: color.black,
    borderRadius: scale.s1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    height: scale.s3 + scale.s1,
    fontSize: typeScale.t1,
    fontWeight: 600,
    marginLeft: 'auto',
    textTransform: 'uppercase'
}