import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Timer extends Component {
  static propTypes = {
    endTime: PropTypes.string.isRequired,
    separators: PropTypes.shape({
      day: PropTypes.string,
      hour: PropTypes.string,
      minute: PropTypes.string,
      second: PropTypes.string
    })
  }

  constructor (props) {
    super(props)

    this.state = {
      remaining: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null
    }
  }

  componentDidMount () {
    const remaining = Math.floor((Date.parse(this.props.endTime) - Date.now()) / 1000)

    this.setState({ remaining }, this.updateTimeDifference)

    this.ticker = setInterval(this.tick, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.ticker)
  }

  tick = () => {
    this.setState(
      { remaining: this.state.remaining - 1 },
      this.updateTimeDifference
    )
  }

  updateTimeDifference () {
    const { remaining } = this.state
    let result

    result = this.divmod(remaining, 86400)
    const days = this.pad(result[0])

    result = this.divmod(result[1], 3600)
    const hours = this.pad(result[0])

    result = this.divmod(result[1], 60)
    const minutes = this.pad(result[0])
    const seconds = this.pad(result[1])

    this.setState({ days, hours, minutes, seconds })
  }

  divmod (x, y) {
    const div = Math.floor(x / y)
    const rem = x % y

    return [div, rem]
  }

  pad (number) {
    return ('0' + number).slice(-2)
  }

  renderSeparator (type) {
    const separators = Object.assign(
      { day: ':', hour: ':', minute: ':', second: '' },
      this.props.separators || {}
    )

    return (
      <span className={`separator ${type}`}>{separators[type]}</span>
    )
  }

  render () {

    const { days, hours, minutes, seconds } = this.state

    return (
      <div className='t-minus-timer'>
        <span className='day'>{days}</span>
        {this.renderSeparator('day')}
        <span className='hour'>{hours}</span>
        {this.renderSeparator('hour')}
        <span className='minute'>{minutes}</span>
        {this.renderSeparator('minute')}
        <span className='second'>{seconds}</span>
        {this.renderSeparator('second')}
      </div>
    )
  }
}

export default Timer
