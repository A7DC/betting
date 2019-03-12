import * as React from 'react'
import { color, scale } from './styles/variables'
import { type } from './styles/typography'


export class Event extends React.Component {
    render() {
        const { home, away, draw, matchNumber, chosenBet, getSelection } = this.props
        // console.log(matchNumber, ' matchNumber')
        return (
            <div style={container}>
                <div style={{
                    width: '100%'
                }}>
                    <h5 style={type.t5}>{`${home.name} (1) - ${away.name} (2)`}</h5>
                    <h6 style={type.t6}>English Premier League {/* need to get from Data object */}</h6>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Button 
                        chosenBet={chosenBet}
                        matchNumber={matchNumber}
                        type={home}
                        getSelection={getSelection}
                    />
                    <Button 
                        chosenBet={chosenBet}
                        matchNumber={matchNumber}
                        type={draw}
                        getSelection={getSelection}
                    />
                    <Button 
                        chosenBet={chosenBet}
                        matchNumber={matchNumber}
                        type={away}
                        getSelection={getSelection}
                    />
                </div>
            </div>
        )
    }
}

const Button = ({ chosenBet, matchNumber, type, getSelection}) => (
    <button
        style={button}
        onClick={() => getSelection(type, matchNumber)}
    >
        <span style={{
            ...icon,
            background: chosenBet == type.name ? color.darkerlime : color.moonGray,
            color: chosenBet == type.name ? color.white : color.lightSilver,
            }}>1</span>
        <span style={{
            background: chosenBet == type.name ? color.lime : color.nearWhite,
            color: chosenBet == type.name ? color.white : color.black,
            ...content
        }}>
            {type.odds}
        </span>
    </button>
)

// Define some standard CSS for your component
const container: React.CSSProperties = {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    margin: `0 0 ${scale.s4}px 0`
}

// Define some standard CSS for your component
const button: React.CSSProperties = {
    display: 'flex',
    flexBasis: '33%',
    flexGrow: 0,
    border: 'none',
    borderRadius: scale.s1,
    padding: 0,
}

// Define some standard CSS for your component
const content: React.CSSProperties = {
    padding: scale.s2,
    flex: 1,
}

// Define some standard CSS for your component
const icon: React.CSSProperties = {
    borderRadius: `${scale.s1} 0 0 ${scale.s1}`,
    padding: scale.s2,
}