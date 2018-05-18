import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import * as _ from 'lodash'

class Search extends Component{
  state = {
    result:[]
  }

  updateQuery = _.debounce(query => {
    const {books} = this.props
    BooksAPI.search(query).then((sbooks) => {
      sbooks.length > 0 && sbooks.forEach((c) => {
        const findBook = books.find(f => f.id === c.id)
        c.shelf = findBook&&findBook.shelf?findBook.shelf:'none'
      })
      this.setState({result:sbooks})
    }).catch((err) => console.log(err))
  },400)

  render(){
    const {books,changeShelf} = this.props
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
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
              <Book key={book.id} book={book} changeShelf={changeShelf}/>
            ))
          }</ol>
        </div>
      </div>
    )
  }
}

export default Search