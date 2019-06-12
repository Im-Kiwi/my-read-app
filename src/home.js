import React, { Component } from 'react'
import Header from './header.js'
import Bookshelfs from './BooksShelfs.js'
import SearchButton from './SearchButton.js'


class Home extends Component {

  render() {
    return(

      <div className="list-books">
        <Header/>
        <Bookshelfs
         bookStore={this.props.bookStore}
         moveBook={this.props.moveBook}
         />
        <SearchButton/>
      </div>
    )
  }
}

export default Home;
