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
          name: 'Bournemouth',
          odds: 2.05
        },
        away: {
          name: 'Newcastle United',
          odds: 3.50
        },
        draw: {
          name: 'Draw',
          odds: 3.70
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
          odds: 1.57
        },
        away: {
          name: 'Chelsea FC',
          odds: 4.20
        },
        draw: {
          name: 'Draw',
          odds: 2.40
        },
      },
      {
        home: {
          name: 'Celtic',
          odds: 10.00
        },
        away: {
          name: 'Rangers',
          odds: 6.00
        },
        draw: {
          name: 'Draw',
          odds: 1.28
        },
      },
      {
        home: {
          name: 'Everton',
          odds: 1.69
        },
        away: {
          name: 'Chelsea',
          odds: 3.10
        },
        draw: {
          name: 'Draw',
          odds: 1.95
        },
      },
      {
        home: {
          name: 'Fulham',
          odds: 13.00
        },
        away: {
          name: 'Manchester City',
          odds: 8.00
        },
        draw: {
          name: 'Draw',
          odds: 1.19
        },
      },
      {
        home: {
          name: 'Brighton and Hove Albion',
          odds: 3.00
        },
        away: {
          name: 'Southamptom',
          odds: 3.15
        },
        draw: {
          name: 'Draw',
          odds: 2.40
        },
      },
      {
        home: {
          name: 'Manchester United',
          odds: 1.47
        },
        away: {
          name: 'Watford',
          odds: 7.59
        },
        draw: {
          name: 'Draw',
          odds: 2.40
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
    events: this.props.events,
    scrolledPastHeader: false,
    activeScreen: 'home',
  }

  static getDerivedStateFromProps(props, state) {
    return {
      events: props.events,
      chosenBets: props.chosenBets,
      totalBets: props.chosenBets.filter(x => Object.keys(x).length).length,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = (e) => {
    const scrollY = window.scrollY
    console.log(scrollY, 'scrollY')
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

  clickLink = (screen) => {
    this.setState({ activeScreen: screen}, () => console.log(this.state.activeScreen, 'activeScreen'))
  }

  render() {
    return (
      <div style={style}>
        <Header onClick={this.clickLink} chosenBets={this.props.chosenBets} totalBets={this.state.totalBets}/>
        <div style={outter}>
          <EventList
            getSelection={this.getSelection}
            chosenBets={this.props.chosenBets}
            events={this.state.events}
          />
        </div>
        <BetSlip
          activeScreen={this.state.activeScreen}
          totalBets={this.state.totalBets}
          chosenBets={this.state.chosenBets}
          events={this.props.events}
        />
        <BetSlipPreview 
          onClick={this.clickLink}
          totalBets={this.state.totalBets}
          chosenBets={this.state.chosenBets} />
      </div>
    )
  }
}

// Define some standard CSS for your component
const style = {
  height: "100%",
  fontFamily: 'proxima-nova, sans-serif',
  background: 'rgb(237, 232, 237)',
  backgroundImage: 'url(images/dark-bg.png)',
  backgroundRepeat: 'repeat-x'
}

const outter = {
  padding: scale.s3,
  position: 'relative',
  height: '100%',
  width: '100%',
}