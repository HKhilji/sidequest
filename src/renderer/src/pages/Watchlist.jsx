import { useState, useEffect } from 'react'

function Watchlist() {
  const [items, setItems] = useState([])

  async function loadWatchlist() {
    const data = await window.api.getWatchlist()
    setItems(data)
  }

  useEffect(() => {
    loadWatchlist()
  }, [])

  async function handleDelete(id) {
    await window.api.deleteFromWatchlist(id)
    loadWatchlist()
  }

  async function handleStatusChange(id, status) {
    await window.api.updateStatus(id, status)
    loadWatchlist()
  }

  return (
    <div>
      <h2>My Watchlist</h2>
      {items.length === 0 && <p>Nothing here yet. Search for something to add!</p>}
      {items.map((item) => (
        <div key={item.id} className="media-card">
          <div>
            <h3>{item.title}</h3>
            <p>{item.type}</p>
            <select
              value={item.status}
              onChange={(e) => handleStatusChange(item.id, e.target.value)}
            >
              <option value="plan_to_watch">Plan to Watch</option>
              <option value="watching">Watching</option>
              <option value="completed">Completed</option>
              <option value="dropped">Dropped</option>
            </select>
            <button onClick={() => handleDelete(item.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Watchlist