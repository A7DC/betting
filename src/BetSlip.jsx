import * as React from "react";
import { color, scale } from './styles/variables'
import { Motion, spring } from 'react-motion'
import { type } from './styles/typography'
import { IconClose } from './icons'

export class BetSlip extends React.Component {

  state = {
    stake: 0,
    totalOdds: 0,
    payout: 0,
    width: 0,
    height: 0,
  }

  componentDidUpdate(prevProps) {
    const newProps = this.props
    if (prevProps !== newProps) {
      this.calculateTotal(this.state.stake, this.props.chosenBets)
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  calculateTotal = (stake, chosenBets) => {

    let oddsArray = []
    chosenBets.map((val, i) => { oddsArray.push(val.odds) })

    const reducer = (acc, currVal) => acc + (isNaN(currVal) ? 0 : currVal);

    this.setState({
      totalOdds: oddsArray.reduce(reducer, 0),
      payout: this.state.totalOdds * this.state.stake,
    })
  }

  handleChange = (event) => {
    this.setState({ stake: event.target.value }, () => {
      this.calculateTotal(this.state.stake, this.props.chosenBets)
    })
  }

  getMotionProps() {
    return this.props.activeScreen === 'betslips'
      ? { style: { y: spring(0) } }
      : { style: { y: spring(this.state.height) } }
  }

  // this.state.activeScreen
  render() {
    const { chosenBets, totalBets } = this.props
    const { totalOdds } = this.state
    return (
      <div>
        <Motion {...this.getMotionProps()}>
          {({ y }) => {
            return (
                <div
                  style={{
                    ...style,
                    transform: 'translateY(' + y + 'px' + ')',

                  }}
                >
                <h2 style={{ ...type.t2, color: 'white', marginBottom: scale.s3, marginTop: 0 }}>{`Betslips (${totalBets})`}</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ flex: 4, overflowY: 'scroll'}}>
                      {chosenBets.map((val, i) => {
                        if (val.name) {
                          return (
                            <Bet
                              key={i}
                              chosenBet={val}
                              event={this.props.events[i]}
                            />
                          )
                        }
                      })}
                    </div>
                    <div style={form}>
                      <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                        <span style={{...type.t5, ...span, fontWeight: 600}}>{`Price: ${totalOdds}`}</span>
                        <span style={{ ...type.t5, ...span, fontWeight: 600 }}>{`Potential winnings: ${Math.round(this.state.payout * 100) / 100}`}</span>
                        <span style={{ ...type.t5, ...span, fontWeight: 600 }}>{`Payout: ${Math.round(this.state.payout * 100) / 100}`}</span>
                        <div style={{display: 'flex', marginTop: scale.s2}}>
                          <input
                            value={this.state.stake}
                            onChange={this.handleChange}
                            placeholder='Type something...'
                            type='number'
                            ref={(input) => { this.input = input }}
                            style={{
                              flex: 1,
                              padding: scale.s3,
                              borderLeft: scale.s2,
                              borderBottomLeftRadius: scale.s1,
                              borderTopLeftRadius: scale.s1,
                              border: 'none'
                            }}
                          />
                          <button style={{
                            background: color.grass,
                            color: color.white,
                            border: 'none',
                            flex: 2,
                            borderBottomRightRadius: scale.s1,
                            borderTopRightRadius: scale.s1,
                            textTransform: 'uppercase',
                            fontWeight: 600,
                          }}>Place bet</button>
                        </div>
                      </div>
                  </div>
                  </div>
                </div>
            )
          }}
        </Motion>
      </div>
    )
  }

}

const Bet = ({ chosenBet, event }) => (
  <div style={card}>
    <div style={{display: 'flex'}}>
      <h6 style={{ ...type.t5, marginBottom: scale.s2,}}>{event.home.name} - {event.away.name}</h6>
      <div style={{marginLeft: 'auto'}}><IconClose /></div>
    </div>
    <div style={{
      display: 'flex'
    }}>
      <h5 style={type.t6}>{chosenBet.name}</h5>
      <h5 style={{ ...type.t6, marginLeft: 'auto'}}>{chosenBet.odds}</h5>
    </div>
  </div>
)

const card = {
  background: color.white,
  color: color.black,
  padding: scale.s3,
  marginBottom: scale.s3,
  borderRadius: scale.s2,
}

const span = {
  color: color.white,
  marginBottom: scale.s3,
  textAlign: 'right'
}

const form = {
  color: color.white,
  paddingTop: scale.s3,
  borderRadius: scale.s2,
}

const style = {
  fontSize: 20,
  width: "100%",
  display: "flex",
  flexDirection: 'column',
  background: color.black,
  color: color.white,
  padding: scale.s3,
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 1,
}