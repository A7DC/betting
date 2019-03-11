import * as React from "react"
import { EventList } from './EventList'
import { BetSlip } from './BetSlip'
import { BetSlipPreview } from './BetSlipPreview'
import { Header } from './Header'
import { scale } from './styles/variables'

export default class App extends React.Component{

  static defaultProps = {
    events: [
      {
        home: {
          name: 'Real Madrid',
          odds: 1.69
        },
        away: {
          name: 'Ajax',
          odds: 5.00
        },
        draw: {
          name: 'Draw',
          odds: 4.20
        },
      },
      {
        home: {
          name: 'Derby County',
          odds: 2.00
        },
        away: {
          name: 'Wigan Athletic',
          odds: 3.00
        },
        draw: {
          name: 'Draw',
          odds: 4.35
        },
      },
      {
        home: {
          name: 'Fullham',
          odds: 3.00
        },
        away: {
          name: 'Chelsea FC',
          odds: 5.00
        },
        draw: {
          name: 'Draw',
          odds: 4.35
        },
      },
      {
        home: {
          name: 'Celtic',
          odds: 3.00
        },
        away: {
          name: 'Rangers',
          odds: 4.00
        },
        draw: {
          name: 'Draw',
          odds: 4.35
        },
      },
      {
        home: {
          name: 'Real Madrid',
          odds: 1.69
        },
        away: {
          name: 'Ajax',
          odds: 5.00
        },
        draw: {
          name: 'Draw',
          odds: 4.20
        },
      },
      {
        home: {
          name: 'Derby County',
          odds: 2.00
        },
        away: {
          name: 'Wigan Athletic',
          odds: 3.00
        },
        draw: {
          name: 'Draw',
          odds: 4.35
        },
      },
      {
        home: {
          name: 'Fullham',
          odds: 3.00
        },
        away: {
          name: 'Chelsea FC',
          odds: 5.00
        },
        draw: {
          name: 'Draw',
          odds: 4.35
        },
      },
      {
        home: {
          name: 'Celtic',
          odds: 3.00
        },
        away: {
          name: 'Rangers',
          odds: 4.00
        },
        draw: {
          name: 'Draw',
          odds: 4.35
        },
      },
    ],
    getSelection: null,
    chosenBets: [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      // if you add more default props have to add more default empty objects
    ],
  }

  state = {
    chosenBets: this.props.chosenBets,
    events: this.props.events,
  }

  static getDerivedStateFromProps(props, state) {
    return {
      events: props.events,
      chosenBets: props.chosenBets,
    }
  }

  getSelection = (val, matchNumber) => {
    // 1. Make a shallow copy of the items
    let chosenBets = [...this.props.chosenBets]
    // // 2. Make a shallow copy of the item you want to mutate
    let bet = { ...chosenBets[matchNumber] }
    // // 3. Replace the property you're intested in
    bet = val
    // // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    this.props.chosenBets[matchNumber] = bet

    this.setState({ chosenBets: chosenBets })
    // 5. Set the state to our new copy
    // console.log(data.chosenBets, 'data.chosenBets')
  }

  render() {
    return (
      <div style={style}>
        <Header chosenBets={this.props.chosenBets} />
        <div style={outter}>
          <EventList
            getSelection={this.getSelection}
            chosenBets={this.props.chosenBets}
            events={this.state.events}
          />
        </div>
        {/* <BetSlip
          chosenBets={this.state.chosenBets}
          events={this.props.events}
        /> */}
        <BetSlipPreview chosenBets={this.state.chosenBets} />
      </div>
    )
  }
}

// Define some standard CSS for your component
const style = {
  height: "100%",
  fontFamily: 'proxima-nova, sans-serif',
  background: 'rgb(237, 232, 237)'
}

const outter = {
  padding: scale.s3,
  position: 'relative',
  height: '100%',
  width: '100%',

}