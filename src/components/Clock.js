import React, { Component } from 'react'
import Block from './Block'

class Clock extends Component {
    constructor(props) {
        super(props)

        const currTime = new Date()
        const h = currTime.getHours()
        const p = h >= 0 && h <= 12 ? 'am' : 'pm'
        this.state = {
            hours: h,
            minutes: currTime.getMinutes(),
            seconds: currTime.getSeconds(),
            parts: p
        }
    }

    componentDidMount() {
        const timeUnit = 1000;
        setInterval(
            () => this.setState(this.updateTime, console.log('Updated')),
            timeUnit
        )
    }

    updateTime(prev) {
        let seconds = prev.seconds + 1
        let minutes = prev.minutes
        if (seconds >= 60) {
            seconds = 0
            minutes++
        }
        let hours = prev.hours
        if (minutes >= 60) {
            minutes = 0
            hours++
        }
        if (hours >= 24) {
            hours = 0
        }
        let parts = hours >= 0 && hours <= 12 ? 'am' : 'pm'

        return {
            hours,
            minutes,
            seconds,
            parts
        }
    }

    inTwoDigits(num) {
        const before = num < 10 ? '0' : ''
        return before + num
    }

    render() {
        return (
            <div className='Line'>
                <Block className='Hours'>{this.inTwoDigits(this.state.hours % 12)}</Block>
                <Block className='Minutes'>{this.inTwoDigits(this.state.minutes)}</Block>
                <Block className='Seconds'>{this.inTwoDigits(this.state.seconds)}</Block>
                <Block className='Parts'>{this.state.parts}</Block>
            </div>
        )
    }
}

export default Clock