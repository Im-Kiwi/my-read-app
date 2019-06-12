import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class SearchBar extends Component {
  state= {
    query:'',
    searchTheLibrary:[]
  }

  updateQuery= (query)=> {
    this.setState({
      query:query
    })
    if(query) {
      BooksAPI.search(query).then(searchedbooks => {
        if(searchedbooks.error){
          this.setState({searchTheLibrary:[]})
        } else {
          this.setState({
            searchTheLibrary:searchedbooks

          })
          if(query.length===0) {
            this.setState({searchTheLibrary:[]})
          }
        }
      })
    } else if(!query) {
      BooksAPI.search('').then(() => {
        this.setState({searchTheLibrary:[]})
      })

    }
  }



  render() {
    let showCover=(cover)=> {
      return cover.imageLinks? cover.imageLinks.thumbnail:''
    }



    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search" >Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event)=> this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchTheLibrary.map((book)=>{
              let currentShelf='none'

              this.props.bookStore.map(store => { return(
                store.id=== book.id ? currentShelf= store.shelf:''
              )})

              return(
              <li key={book.id} >
                <div className="book">
                  <div className="book-top">
                    {}
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${showCover(book)})` }}></div>
                    <div className="book-shelf-changer">
                      <select
                      onChange={(event) => this.props.moveBook(book,event.target.value)}
                      value={currentShelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            )})}
           </ol>
        </div>
      </div>
    )
  }
}

export default SearchBar
