import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBar from './SearchBar.js'
import Home from './home.js'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     showSearchPage: true,
     books:[]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books:books})
    })
  }

  moveBook= (book,shelf) => {
    BooksAPI.update(book,shelf).then((books) => {
      BooksAPI.getAll().then((books) => {
        this.setState({books:books})
      })
    });
  }


  render() {
    return (
      <div className="app">
        <Route exact path= "/" render= {() => {return (
          <Home
          bookStore= {this.state.books}
          moveBook= {this.moveBook}
            />)
        }}/>
        <Route path="/search" render= {() => {return (
          <SearchBar
            bookStore={this.state.books}
            moveBook={this.moveBook}/>
        )}}/>
      </div>
    )
  }
}

export default BooksApp
