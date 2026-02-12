import { useParams } from "react-router";

function MovieDetail() {
    const {movieId} = useParams();
    return (
        <div>{movieId} 映画詳細ページ</div>
    );
}

export default MovieDetail;