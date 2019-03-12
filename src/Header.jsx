import * as React from 'react';
import {color, scale, typeScale} from './styles/variables'

export class Header extends React.Component {
    state = {
        totalBets: 0
    }
    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (prevProps !== this.props) {
            this.setState({ 
                totalBets: this.props.chosenBets.filter(x => Object.keys(x).length).length 
            })
        }
    }

    render() {
        console.log(this.props, 'props')
        // console.log(this.props.chosenBets.filter(x => Object.keys(x).length).length, ' dfdg')
        return (
            <header style={container}>
                <img style={logo} src={'/images/logo.png'} />
                <button onClick={() => this.props.onClick('betslips')} style={button}>{this.state.totalBets} bets</button>
            </header>
        );
    }
}

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