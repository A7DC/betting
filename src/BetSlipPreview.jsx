import * as React from 'react';
import { Event } from './Event'
import { color, scale, typeScale } from './styles/variables'
import { type } from './styles/typography'


export class BetSlipPreview extends React.Component {
  state = {
    totalBets: 0,
    nextLevelIn: 3,
    bonus: 10
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps !== this.props) {
      this.setState({
        totalBets: this.props.chosenBets.filter(x => Object.keys(x).length).length
      }, () => this.calculateWinBonus(this.state.totalBets) )
    }
  }

  componentDidMount() {
    this.setState({
      height: this.element.offsetHeight
    })
  }

  calculateWinBonus(totalBets) {

    // make DRY

    if (totalBets <= 3) {
      for (let i = 0; i <= 3; i++) {
        if (totalBets === i) {
          this.setState({ 
            nextLevelIn: Math.abs(i - 3),
            bonus: this.state.bonus,
          }, () => console.log(this.state.nextLevelIn, 'nextLevelIn'))
        }
      }
    } 

    if (totalBets >= 3 && totalBets <= 5) {
      for (let i = 0; i <= 5; i++) {
        if (totalBets === i) {
          this.setState({ 
            nextLevelIn: Math.abs(i - 5),
            bonus: 50,
          }, () => console.log(this.state.nextLevelIn, 'nextLevelIn'))
        }
      }
    } 

    if (totalBets >= 5 && totalBets <= 6) {
      for (let i = 0; i <= 6; i++) {
        if (totalBets === i) {
          this.setState({ 
            nextLevelIn: Math.abs(i - 6),
            bonus: 100,
          }, () => console.log(this.state.nextLevelIn, 'nextLevelIn'))
        }
      }
    } 


  }

  render() {
    const { chosenBets } = this.props

    return (
      <div 
        style={{
          ...style,
          bottom: this.state.height,
        }
        }
        ref={(el) => { this.element = el; }}>
        >
        <h3 style={{
          fontSize: type.t2,
          color: color.yellow,
        }}>{this.state.bonus === 100 ? '100% win bonus!' : `${this.state.bonus}% win bonus in ${this.state.nextLevelIn} bets`}</h3>
        <div style={{display: 'flex'}}>
          <span>{this.state.totalBets} bets in slip</span>
          <span style={{ marginLeft: 'auto' }}>Price: $price</span>
        </div>
      </div>
    )
  }
}

// Define some standard CSS for your component
const style = {
  padding: scale.s3,
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  background: color.black,
  color: color.white,
};