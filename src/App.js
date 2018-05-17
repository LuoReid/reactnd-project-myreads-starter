import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Book from './Book'
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
    showSearchPage: false,
    books:[],
    query:'',
    result:[]
  }
  updateQuery = (query) => {
    BooksAPI.search(query).then((sbooks) => {
      console.log(sbooks)
      sbooks.length > 0 && sbooks.forEach((c) => {
        const findBook = this.state.books.find(f => f.id === c.id)
        c.shelf = findBook&&findBook.shelf?findBook.shelf:'none'
      })
      this.setState({result:sbooks})
    }).catch((err) => console.log(err))
  }

  clearQuery = () => { this.setState({query:''}) }

  componentDidMount(){
    this.getMyBooks()
  }

  getMyBooks = () => {
    BooksAPI.getAll().then((books)=>{
      this.setState({books:books})
    })
  }

  changeShelf = (book,shelf) => {
    BooksAPI.update(book,shelf).then(() => { this.getMyBooks() })
  }

  render() {
    const query = this.state.query
    let books;
    if(query){

    }

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"
                onChange={(event) => this.updateQuery(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">{
                this.state.result.length > 0 && this.state.result.map((book) => (
                  <Book key={book.id} book={book} changeShelf={this.changeShelf}/>
                ))
              }</ol>
            </div>
          </div>
        ) : (
        <MyBook books={this.state.books} changeShelf={this.changeShelf} />

        )}
      </div>
    )
  }
}

export default BooksApp
