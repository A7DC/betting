import * as React from 'react';
import { Event } from './Event'
import { color, scale, typeScale } from './styles/variables'
import { type } from './styles/typography'
import { Motion, spring } from 'react-motion'
import { throws } from 'assert';

export class BetSlipPreview extends React.Component {
  state = {
    totalBets: 0,
    nextLevelIn: 3,
    bonus: 10,
    scrollPastHeader: false,
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps !== this.props) {
      this.setState({
        totalBets: this.props.chosenBets.filter(x => Object.keys(x).length).length
      }, () => {
        this.calculateWinBonus(this.state.totalBets)
        this.setState({ scrollPastHeader: true})
        console.log("dfgfdg")
      } )
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
          })
        }
      }
    } 

    if (totalBets >= 3 && totalBets <= 5) {
      for (let i = 0; i <= 5; i++) {
        if (totalBets === i) {
          this.setState({ 
            nextLevelIn: Math.abs(i - 5),
            bonus: 50,
          })
        }
      }
    } 

    if (totalBets >= 5 && totalBets <= 6) {
      for (let i = 0; i <= 6; i++) {
        if (totalBets === i) {
          this.setState({ 
            nextLevelIn: Math.abs(i - 6),
            bonus: 100,
          })
        }
      }
    } 
  }


  getMotionProps() {
    return this.state.scrollPastHeader === false
      ? { style: { y: spring(0) } }
      : { style: { y: spring(-this.state.height) } }
  }

  render() {
    return (

      <div>
        <Motion {...this.getMotionProps()}>
          {({ y }) => {
            return (
              <div 
              ref={(el) => { this.element = el; }}
              style={{ 
                ...style,
                bottom: -this.state.height,
                transform: 'translateY(' + y + 'px' + ')'
                }}>
                <h3 style={{
                  fontSize: type.t2,
                  margin: `${scale.s3} 0`,
                  color: color.yellow,
                }}>{this.state.bonus === 100 ? '100% win bonus!' : `${this.state.bonus}% win bonus in ${this.state.nextLevelIn} bets`}</h3>
                <div style={{ display: 'flex' }}>
                  <span>{this.state.totalBets} bets in slip</span>
                  <span style={{ marginLeft: 'auto' }}>Price: $price</span>
                </div>
              </div>
            )
          }}
        </Motion>
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