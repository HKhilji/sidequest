import { useState } from 'react'

function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    const data = await window.api.searchMedia(query)
    setResults(data)
    setLoading(false)
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
              <h3>{item.title || item.name}</h3>
              <p>{item.media_type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
