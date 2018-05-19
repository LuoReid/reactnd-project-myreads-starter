import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import Search from './Search'
import MyBook from './MyBook'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books:[]
  }

  componentDidMount(){
    this.getMyBooks()
  }

  getMyBooks = () => {
    BooksAPI.getAll().then((books)=>{
      this.setState({books:books})
    })
  }

  changeShelf = (book,shelf) => {
    book.shelf = shelf
    BooksAPI.update(book,shelf).then(() => { this.getMyBooks() })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MyBook books={this.state.books} changeShelf={this.changeShelf} />
        )}/>
        <Route path="/search" render={() => (
          <Search books={this.state.books} changeShelf={this.changeShelf} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
