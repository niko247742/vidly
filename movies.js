import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import ListGroup from '../common/listGroup';
import Pagination from '../common/pagination';
import { paginate } from "../util/paginate";
import MovieTable from './moviesTable';
import SearchBox from './searchBox';
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: {
            path: 'title',
            order: 'asc'
        }
    };

    componentDidMount() {
        const genres = [{name: 'All Genres', _id: ""}, ...getGenres()]
        this.setState(
            {movies: getMovies(),
            genres: genres
        });
    }
    handleDelete = movie => {
        const movies = this.state.movies.filter((m) => m._id !== movie._id)
        this.setState(
            {movies: movies}
        )
    }
    
    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies })
        //console.log("I was clicked", movie);
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page})//console.log(page);
    }
    handleGenreSelect = (genre) => {
        //console.log(genre)
        this.setState({   
            selectedGenre: genre,
            searchQuery: '',
            currentPage: 1
            }
        )

    }
    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1})
    }

    handleSort = (sortColumn) => {
       
        this.setState({
             sortColumn 
        })
    }
    getPageData = () => {
        const { pageSize, currentPage, selectedGenre, movies: allMovies, sortColumn, searchQuery } = this.state;

        let filtered = allMovies;
        if(searchQuery)
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies };
        
    }
    
    render() {
        const { pageSize, currentPage, sortColumn } = this.state;

        
        const { totalCount, data: movies } = this.getPageData();
        return (
            <div className = 'row'>
                <div className = 'col-3'>
                    <ListGroup 
                        items = { this.state.genres } 
                        onItemSelect = { this.handleGenreSelect }
                        selectedItem = { this.state.selectedGenre }
                        //textProperty = "name"
                        //valueProperty = "_id"
                    />
                </div>
                <div className = "col">
                    <Link 
                        to="/movies/new"
                        className = "btn btn-primary"
                        style = {{marginBottom: 20 }}>
                    New Movie
                    </Link>
                    {totalCount === 0 ? <h2>There are no movies</h2> : <h2>There are {totalCount} movies.</h2>}
                    <SearchBox value = { this.searchQuery } onChange = { this.handleSearch } />
                    <MovieTable
                        movies = { movies }
                        onDelete = { this.handleDelete }
                        onLike = { this.handleLike }
                        onSort = { this.handleSort }
                        sortColumn = { sortColumn }
                    />
                    
                    <Pagination 
                        itemsCount = { totalCount }
                        pageSize = { pageSize }
                        onPageChange = { this.handlePageChange }
                        currentPage = { currentPage }/>               
                </div> 
            </div>             
        )
    }
}

export default Movies