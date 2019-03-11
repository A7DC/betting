import * as React from "react";

type Props = { 
  chosenBets: any,
  events: any,
}


const Bet = ({ chosenBet, event }) => (
  <div>
    <h6>{event.home.name} - {event.away.name}</h6>
    <h5>{chosenBet.name}</h5>
    <h5>{chosenBet.odds}</h5>
  </div>
)

export class BetSlip extends React.Component<Props> {

  input: HTMLInputElement;

  state = {
    stake: 0,
    totalOdds: 0,
    payout: 0,
    open: false,
  }

  componentDidUpdate(prevProps) {
    const newProps = this.props
    if (prevProps !== newProps) {
      this.calculateTotal(this.state.stake, this.props.chosenBets)
      if (this.props.chosenBets.filter(e => e.name).length > 0) {
        this.setState({open: true})
      }
    }
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

  showBetslip = ({ chosenBets}) => {
    console.log(chosenBets, 'chosenBets asdfsdg')
  }

  render() {
    const { chosenBets } = this.props
    const { totalOdds, payout } = this.state
    return (
    <div style={style}>
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
        {this.state.open ? 
          <div>
            <input
              value={this.state.stake}
              onChange={this.handleChange}
              placeholder='Type something...'
              type='number'
              ref={(input) => { this.input = input }}
            />
            {`The total odds are ${totalOdds}`}
            {`The total payout is ${payout}`} 
          </div> : null
        }
    </div>
    )
  }

}

// Define some standard CSS for your component
const style: React.CSSProperties = {
  color: "#333",
  fontSize: 20,
  width: "100%",
  display: "flex",
  flexDirection: 'column'
};