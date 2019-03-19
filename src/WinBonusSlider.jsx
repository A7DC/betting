import * as React from 'react';
import { color, scale } from './styles/variables'
import { type } from './styles/typography'

export class WinBonusSlider extends React.Component {

  state = {
    min: 2,
    max: 10,
    tiers: [0, 10, 50, 100],
    activeBonus: undefined,
  }

  componentDidMount() {
    this.setState({activeBonus: this.state.tiers[0]})
  }

 componentDidUpdate(prevProps, prevState) {
   if (prevProps.totalBets !== this.props.totalBets) {
    console.log(this.state, 'state')
     this.calculateWinBonus(this.props.totalBets)
     this.calcSliderProgressBar(this.props.totalBets)
   }
 }

  calculateWinBonus(totalBets) {

    const {tiers, min, max} = this.state


    const createTier = (min, max, activeBonus, totalBets) => {
      if (totalBets >= min && totalBets <= max) {
        for (let i = min; i <= max; i++) {
          if (totalBets === i) {
            this.setState({
              activeBonus: activeBonus,
            })
          }
        }
      }
    }

    createTier(min, 4, tiers[1], totalBets)
    createTier(4, 6, tiers[2], totalBets)
    createTier(6, max, tiers[3], totalBets)

  }

  calcSliderProgressBar = (totalBets) => {
    const {min, max} = this.state
    for (let i = 0; i < max; i++) {
      if (totalBets === i) {
        this.setState({
          slideWidth: (i * 100) / (min - (max - 2)) * -1,
        })
      }
    }
  }

  renderDots() {
    const dots = this.state.tiers.map((val, i) => {
      return (
        <div>
          <div
            key={i}
            style={{
              ...style.dot,
              backgroundColor: val <= this.state.activeBonus ? color.yellow : color.nearBlack
            }}
          >
          </div>
        </div>
      )
    })
    return dots
  }

  renderLabels() {
    const labels = this.state.tiers.map(i => {
      return (
        <span style={{ color: color.silver }}>{i}%</span>
      )
    })
    return labels
  }

  render() {
    return (
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          {this.renderLabels()}
        </div>
        <div style={style.outter}> 
        <div style={style.ballContainer}>
          {this.renderDots()}
        </div>
          <div style={{
            ...style.inner,
            width: `${this.state.slideWidth}%`
          }}>
          </div>
        </div>
      </div>
    )
  }
}

// Define some standard CSS for your component
const style = {
  outter: {
    position: 'relative',
    backgroundColor: color.nearBlack,
    height: scale.s1 / 2,
    width: '95%',
    marginTop: scale.s3,
    marginBottom: scale.s3,
  },
  inner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: color.yellow,
    height: '100%',
  },
  ballContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '-0.4rem',
  },
  dot: {
    width: scale.s3,
    height: scale.s3,
    borderRadius: '100%'
  },
}