import React, { Component } from 'react'
import config from '../../config'
import './LearningRoute.css'
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import TokenService from '../../services/token-service'
import './LearningRoute.css'

class LearningRoute extends Component {
  state = {
    head: '',
    total: '',
    wordCorrectCount: '',
    wordIncorrectCount: '',
    guess: '',
    answer: '',
    isCorrect: null,
    currWord: ''
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language/head`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok) ? res.json().then(e => Promise.reject(e))
          : res.json())
      .then(data => {
        this.setState({
          head: data.nextWord,
          total: data.totalScore,
          wordCorrectCount: data.wordCorrectCount,
          wordIncorrectCount: data.wordIncorrectCount,
          currWord: data.nextWord
        })
      })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({ guess: this.state.guess })
    })
      .then(res =>
        (!res.ok) ? res.json().then(e => Promise.reject(e))
          : res.json())
      .then(data => {
        this.setState({
          answer: data.answer,
          isCorrect: data.isCorrect,
          head: data.nextWord,
          total: data.totalScore,
          wordCorrectCount: data.wordCorrectCount,
          wordIncorrectCount: data.wordIncorrectCount,
          currWord: this.state.head
        })
      })
  }

  handleNext = () => {
    this.setState({
      answer: '',
      guess: ''
    })
  }

  handleInput = (e) => {
    const guess = e.target.value
    let str = guess.toLowerCase()
    this.setState({
      guess: str
    })
  }

  render() {
    let result
    if (this.state.isCorrect === true) {
      result =
        <div>
          <h3>You are correct!</h3>
          <br></br>{' '}
          <br></br>{' '}
          <p>
            The correct translation for <strong>{this.state.currWord}</strong> was <strong>{this.state.answer}</strong> and you answered <strong>{this.state.guess}</strong>!
        </p>
        </div>
    }
    if (this.state.isCorrect === false) {
      result = (
        <div>
          <h3>Good try, you are very close!</h3>
          <br></br>{' '}
          <br></br>{' '}
          <p>The correct translation for <strong>{this.state.currWord}</strong> was <strong>{this.state.answer}</strong> and you answered <strong>{this.state.guess}</strong>!
          </p>
        </div>
      )
    }

    return (
      <section className='learning-page'>
        <div className='learning-content'>
          <div>
            <p>{`Your total score is: ${this.state.total}`}</p>
          </div>

          <div>
            {!this.state.answer ? (
              <section>
                <h2>Translate the word:</h2>
                <h3>{this.state.head}</h3>
                <br></br>{' '}
                <br></br>{' '}
              </section>) : (
                <div>
                  {this.state.isCorrect ? result : result}
                </div>
              )}
          </div>

          {!this.state.answer ? (
            <form onSubmit={e => this.handleSubmit(e)}>
              <Label htmlFor="learn-guess-input" className="label">
                What's the correct translation for this word?
              </Label>
              <br></br>{' '}
              <br></br>{' '}
              <Input
                id="learn-guess-input"
                type="text"
                value={this.state.guess}
                onChange={e => this.handleInput(e)}
                name="question"
                required
              />
              <Button type="submit">Submit</Button>
            </form>) : (
            <Button onClick={this.handleNext}>Next Word</Button>
          )}
          
          <div>
            <p className="word-stats">
              correct answer count: {this.state.wordCorrectCount} 
            </p>
            <p className="word-stats">
              incorrect answer count: {this.state.wordIncorrectCount} 
            </p>
          </div>
            
        </div>
      </section>
    )
  }
}

export default LearningRoute
