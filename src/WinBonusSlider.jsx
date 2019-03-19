import * as React from 'react';
import { color, scale } from './styles/variables'
import { type } from './styles/typography'

export class WinBonusSlider extends React.Component {

  state = {
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
   }
 }

  calculateWinBonus(totalBets) {

    const {tiers} = this.state


    const createTier = (min, max, activeBonus, totalBets) => {
      if (totalBets >= min && totalBets <= max) {
        for (let i = min; i <= max; i++) {
          if (totalBets === i) {
            this.setState({
              activeBonus: activeBonus,
            }, () => this.calcSliderProgressBar(this.state.activeBonus, this.state.tiers))
          }
        }
      }
    }

    createTier(2, 4, tiers[1], totalBets)
    createTier(4, 6, tiers[2], totalBets)
    createTier(6, 8, tiers[3], totalBets)

  }

  calcSliderProgressBar = (activeBonus, tiers) => {

    tiers.map((val, index) => {
      if (val === activeBonus) {
        if (activeBonus === 10) this.setState({slideWidth: '25%'})
        if (activeBonus === 50) this.setState({slideWidth: '50%'})
        if (activeBonus === 100) this.setState({slideWidth: '100%'})
      }
    })

  }

  render() {
    return (
      <div>
        <div style={style.ballContainer}>
          {this.state.tiers.map((val, i) => {
            return (
              <div>
                <div
                  key={i}
                  style={{
                    ...style.dot,
                    // backgroundColor: this.getDot(val)
                    backgroundColor: val <= this.state.activeBonus ? color.yellow : color.nearBlack
                  }}
                >
                </div>
                <span syle={{color: color.silver}}>{i}</span>
              </div>
            )
          })}
        </div>
        <div style={style.outter}> 
          <div style={{
            ...style.inner,
            width: this.state.slideWidth
            // width: this.state.activeBonus == this.state.tiers[1] ? '25%' : ''
          }}></div>
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
    width: '100%',
    marginTop: scale.s3,
  },
  inner: {
    position: 'absolute',
    backgroundColor: color.yellow,
    height: '100%',
  },
  ballContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  dot: {
    width: scale.s3,
    height: scale.s3,
    borderRadius: '100%'
  },
}