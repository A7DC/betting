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
        // console.log(this.props.chosenBets.filter(x => Object.keys(x).length).length, ' dfdg')
        return (
            <header style={container}>
                <button style={button}>{this.state.totalBets} bets</button>
            </header>
        );
    }
}

// Define some standard CSS for your component
const container = {
    height: 92,
    paddingTop: scale.s2, 
    paddingRight: scale.s3, 
    display: 'flex',
    textAlign: 'center',
    color: '#8855FF',
    background: color.black,
    overflow: 'hidden'
}

// Define some standard CSS for your component
const button = {
    background: color.yellow,
    color: color.black,
    borderRadius: scale.s1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    height: scale.s3 + scale.s1,
    marginTop: scale.s2,
    fontSize: typeScale.t1,
    marginLeft: 'auto',
    textTransform: 'uppercase'
}