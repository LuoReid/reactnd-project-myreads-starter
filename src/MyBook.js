import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf'

class MyBook extends Component{
  render(){
    const {books,changeShelf} = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          <BookShelf bookshelf={{name:'Currently Reading',shelf:'currentlyReading'}} books={books} changeShelf={changeShelf}/>
          <BookShelf bookshelf={{name:'Want to Read',shelf:'wantToRead'}} books={books} changeShelf={changeShelf}/>
          <BookShelf bookshelf={{name:'Read',shelf:'read'}} books={books} changeShelf={changeShelf}/>
          </div>
        </div>
        <div className="open-search">
          <Link to={'/search'}>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MyBook