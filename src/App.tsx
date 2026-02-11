import { useState, useEffect } from 'react';
import './App.css'

type Movie = {
  id: string;
  original_title: string;
  overview: string;
  poster_path: string;
};

type MovieJson = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};


function App() {
  const fetchMovieLost = async () => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    };

    let url = '';
    if (keyword) {
      url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ja&page=1`;
    } else {
      url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
    }

    const response = await fetch(url, options)
    const data = await response.json();
    setMovieList(data.results.map((movie: MovieJson) => ({
      id: movie.id,
      original_title: movie.original_title,
      poster_path: movie.poster_path,
      overview: movie.overview,
    })));
  }

  const [keyword, setKeyword] = useState('');
  const [movieList, setMovieList] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovieLost();
  }, [keyword]);

  return (
    <div>
      <p>{keyword}</p>
      <input type="text" onChange={(e) => (setKeyword(e.target.value))} />

      {movieList
        .filter((movie) => (movie.original_title.includes(keyword)))
        .map((movie) => (
          <div key={movie.id}>
            <h2>{movie.original_title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" className='poster-img' />
            <p>{movie.overview}</p>
          </div>
        ))}
    </div>
  )
}

export default App
