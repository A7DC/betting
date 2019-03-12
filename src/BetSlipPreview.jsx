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
    currentBonus: 10,
    previousBonus: undefined,
    scrollPastHeader: false,
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps !== this.props) {
      this.setState({
        totalBets: this.props.chosenBets.filter(x => Object.keys(x).length).length
      }, () => {
        this.calculateWinBonus(this.state.totalBets)
        this.calculateOdds(this.props.chosenBets)
        this.setState({ scrollPastHeader: true})
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
            currentBonus: this.state.currentBonus,
          })
        }
      }
    } 

    if (totalBets >= 3 && totalBets <= 5) {
      for (let i = 0; i <= 5; i++) {
        if (totalBets === i) {
          this.setState({ 
            nextLevelIn: Math.abs(i - 5),
            currentBonus: 50,
            previousBonus: 10,
          })
        }
      }
    } 

    if (totalBets >= 5 && totalBets <= 6) {
      for (let i = 0; i <= 6; i++) {
        if (totalBets === i) {
          this.setState({ 
            nextLevelIn: Math.abs(i - 6),
            currentBonus: 100,
            previousBonus: 100,
          })
        }
      }
    } 
  }

  calculateOdds = (chosenBets) => {

    let temporayArray = []
    chosenBets.map((val, i) => { temporayArray.push(val.odds) })

    let oddsArray = []
    temporayArray.forEach(element => {
      if (typeof element == 'number') {
        oddsArray.push(element)
      }
    })
      
    this.setState({
      totalOdds: oddsArray.reduce((a, b) => a * b, 0)
    })

  }


  getMotionProps() {
    return this.state.scrollPastHeader === false
      ? { style: { y: spring(0) } }
      : { style: { y: spring(-this.state.height) } }
  }

  handleClick = (screen) => {
    this.props.onClick(screen)
  }

  render() {
    return (

      <div onClick={() => this.handleClick('betslips')}>
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
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{
                    fontSize: type.t2,
                    margin: 0,
                    color: color.yellow,
                  }}>{this.state.currentBonus === 100 ? '100% win bonus!' : `Get a ${this.state.currentBonus}% win bonus in ${this.state.nextLevelIn} bets`}</h3>
                  <span style={{ 
                    ...type.t5,
                    ...span,
                  }}>Price: {Math.round(this.state.totalOdds * 100) / 100} {this.state.totalBets >= 3 ? `(+${this.state.previousBonus}% win bonus active)` : null}</span>
                </div>
              </div>
            )
          }}
        </Motion>
      </div>
    )
  }
}

const style = {
  paddingLeft: scale.s4,
  paddingRight: scale.s4,
  paddingTop: scale.s3,
  paddingBottom: scale.s3,
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  background: color.black,
  color: color.white,
}

const span = {
  color: color.white
}