import React, { Component } from 'react'
import BookStatus from './BookStatus.js'

class Bookshelfs extends Component {


  setBookStatus= (status) => {
      return this.props.bookStore.filter((books) => books.shelf === status );

  }



  render() {
    

    return (

      <div className="list-books-content">
        <BookStatus
        booksRead={this.setBookStatus('currentlyReading')}
        category={'Currently Reading'}
        moveBook={this.props.moveBook}
        />

        <BookStatus
        booksRead={this.setBookStatus('wantToRead')}
        category={'Want To Read'}
        moveBook={this.props.moveBook}
        />

        <BookStatus
        booksRead={this.setBookStatus('read')}
        category= {'Read'}
        moveBook={this.props.moveBook}
        />
      </div>

    )
  }
}

export default Bookshelfs;
