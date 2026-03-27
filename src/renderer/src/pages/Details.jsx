import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Details() {
  const { type, id } = useParams()
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDetails()
  }, [])

  async function loadDetails() {
    const data = await window.api.getDetails(id, type)
    setDetails(data)
    setLoading(false)
  }

  if (loading) return <p>Loading...</p>
  if (!details) return <p>Something went wrong.</p>
  
  return (
    <div>
      <h2>{details.title || details.name}</h2>
      <p>{details.overview}</p>
      <p>Rating: {details.vote_average}/10</p>
      <p>Status: {details.status}</p>

      {details.videos?.results?.length > 0 && (
        <div>
          <h3>Trailer</h3>
          <a
            href={`https://youtube.com/watch?v=${details.videos.results[0].key}`}
            target="_blank"
            rel="noreferrer"
          >
            Watch Trailer
          </a>
        </div>
      )}

      {details.reviews?.results?.length > 0 && (
        <div>
          <h3>Reviews</h3>
          {details.reviews.results.slice(0, 3).map((review) => (
            <div key={review.id}>
              <strong>{review.author}</strong>
              <p>{review.content.slice(0, 200)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Details