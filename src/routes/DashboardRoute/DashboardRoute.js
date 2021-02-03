import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import { Link } from 'react-router-dom'
import './Dashboard.css'

class Dashboard extends Component {
  state = {
    language: '',
    words: [],
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(res => {
        this.setState({
          language: res.language,
          words: res.words
        })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const language = this.state.language
    const words = this.state.words

    return (
      <section className='dashboard'>
        <section className='top-section'>
          <h2>Chinese</h2>
          <p>Total correct answers: {language.total_score}</p>
          <h2><strong>
            <Link to='/learn' className='learning-route'>Start Practicing</Link>
          </strong></h2>
        </section>

        <section className='practice-word'>
          <h3>Words to practice</h3>
          <ul>
            {words.map((word, index) => {
              return (

                <li key={index}>
                  <h4>{word.original}/{word.translation}</h4>
                  <span className='correct'>correct answer count: {word.correct_count}</span>
                  <span className='incorrect'>incorrect answer count: {word.incorrect_count}</span>
                </li>
              )}
            )}
          </ul>
        </section>
      </section>
    )
  }
}

export default Dashboard