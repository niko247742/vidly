import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from '../common/like'

class Movies extends Component {
    state = {
        movies: getMovies(),
    };

    handleDelete = movie => {
        const movies = this.state.movies.filter((m) => m._id !== movie._id)
        this.setState(
            {movies: movies}
        )
    }
    handleMessage() {
        return this.state.movies.length === 0 ? <h2>There are no movies</h2> : <h2>There are {this.state.movies.length} movies.</h2>

    }
    handleLike(movie) {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies })
        //console.log("I was clicked", movie);
    }
    

    render() {
        return (
            <React.Fragment>
                {this.handleMessage()}
                <table className = "table">
                    <thead className = "thead-dark">
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => (
                            <tr key = {movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like 
                                        liked = { movie.liked }
                                        onClick = {() => this.handleLike(movie)}
                                    />
                                </td>
                                <td><button 
                                    onClick = {() => this.handleDelete(movie)} 
                                    className = "btn btn-danger btn-small">Delete</button></td>
                            </tr>
                        ))}                    
                    </tbody>
                </table>                
            </React.Fragment>                
        )
    }
}

export default Movies