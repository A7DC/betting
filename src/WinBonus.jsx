import * as React from 'react';
import { color, scale } from './styles/variables'
import { type } from './styles/typography'

export class WinBonus extends React.Component {

  state = {
    currentBonus: 10,
    previousBonus: 10,
  }

 componentDidMount() {
   this.calculateWinBonus(this.props.totalBets)
 }

 componentDidUpdate(prevProps, prevState) {
   if (prevProps.totalBets !== this.props.totalBets) {
    this.calculateWinBonus(this.props.totalBets)
    this.props.getPreviousBonus(this.state.previousBonus)
   }
 }

  calculateWinBonus(totalBets) {


    const createTier = (min, max, currentBonus, previousBonus, totalBets) => {
      if (totalBets >= min && totalBets <= max) {
        for (let i = min; i <= max; i++) {
          if (totalBets === i) {
            this.setState({
              nextLevelIn: Math.abs(i - max),
              currentBonus: currentBonus,
              previousBonus: previousBonus,
            })
          }
        }
      }
    }

    createTier(0, 3, 10, 0, totalBets)
    createTier(2, 4, 50, 10, totalBets)
    createTier(4, 6, 100, 50, totalBets)

    // if (totalBets >= 3 && totalBets <= 5) {
    //   for (let i = 0; i <= 5; i++) {
    //     if (totalBets === i) {
    //       this.setState({
    //         nextLevelIn: Math.abs(i - 5),
    //         currentBonus: 50,
    //         previousBonus: 10,
    //       })
    //     }
    //   }
    // }

    // if (totalBets >= 5 && totalBets <= 6) {
    //   for (let i = 0; i <= 6; i++) {
    //     if (totalBets === i) {
    //       this.setState({
    //         nextLevelIn: Math.abs(i - 6),
    //         currentBonus: 100,
    //         previousBonus: 100,
    //       })
    //     }
    //   }
    // }

  }

  render() {
    const { currentBonus, nextLevelIn } = this.state
    return (
      <h3 style={{
        fontSize: type.t2,
        margin: 0,
        color: color.yellow,
      }}>{`Add ${nextLevelIn} more bets for a ${currentBonus}% win bonus`}</h3>
    )
  }
}

// Define some standard CSS for your component
const style = {
  height: '100%',
  width: '100%',
  color: '#8855FF',
  background: 'white',
  borderRadius: scale.s2,
  padding: scale.s3,
  overflow: 'scroll'
};