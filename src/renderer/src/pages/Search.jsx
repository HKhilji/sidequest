import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    const data = await window.api.searchMedia(query)
    setResults(data)
    setLoading(false)
  }

  async function handleAdd(item) {
    await window.api.addToWatchlist({
      tmdb_id: item.id,
      title: item.title || item.name,
      type: item.media_type,
      status: 'plan_to_watch',
      poster_url: item.poster_path
    })
    alert(`${item.title || item.name} added to Sidequest!`)
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies, shows, anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Searching...</p>}

      <div className="results">
        {results.map((item) => (
          <div key={item.id} className="media-card">
            {item.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                alt={item.title || item.name}
              />
            )}
            <div>
              <h3
                onClick={() => navigate(`/details/${item.media_type}/${item.id}`)}
                style={{ cursor: 'pointer' }}
              >
                {item.title || item.name}
              </h3>
              <p>{item.media_type}</p>
              <button onClick={() => handleAdd(item)}>+ Add to Watchlist</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
