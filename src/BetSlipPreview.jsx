import * as React from 'react';
import { color, scale } from './styles/variables'
import { type } from './styles/typography'
import { Motion, spring } from 'react-motion'
import { WinBonusSlider } from './WinBonusSlider';

export class BetSlipPreview extends React.Component {

  state = {
    previousBonus: undefined,
    scrollPastHeader: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.calculateOdds(this.props.chosenBets)
      this.setState({ scrollPastHeader: true })
    }
  }

  componentDidMount() {
    this.setState({
      height: this.element.offsetHeight
    })
  }

  calculateOdds = (chosenBets) => {
    let temporayArray = []
    // eslint-disable-next-line array-callback-return
    chosenBets.map((val, i) => { temporayArray.push(val.odds) })
    
    let oddsArray = []
    temporayArray.forEach(element => {
      if (typeof element == 'number') {
        oddsArray.push(element)
      }
    })
      
    this.setState({
      totalOdds: oddsArray.reduce((a, b) => a * b, 1)
    })

  }

  getMotionProps() {
    return this.state.scrollPastHeader === false
      ? { style: { y: spring(0) } }
      : { style: { y: spring(-this.state.height) } }
  }

  render() {
    const { totalBets } = this.props
    
    return (
      <div onClick={() => this.props.onClick('betslips')}>
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
                <div style={{ display: 'flex' }}>
                  <h3 style={{
                    ...type.t2,
                    margin: 0,
                    color: color.white,
                  }}>{totalBets} bets
                  <span style={{
                    ...type.t5,
                    margin: 0,
                    color: color.yellow,
                    display: 'block',
                  }}>+ win bonus</span>
                  </h3>
                  <div style={{flex: 2, paddingLeft: scale.s4, paddingRight: scale.s4}}>
                    <WinBonusSlider totalBets={totalBets} />
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
