import React from 'react'

function SideBar() {
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open')
  }
  return (
    <aside className="sidebar">
      <h3>Shopping Categories</h3>
      <button className="sidebar-close-btn" onClick={closeMenu}>
        X
      </button>
      <ul>
        <li>
          <a href="/">Bookmarks</a>
        </li>
        <li>
          <a href="/">Mugs</a>
        </li>
      </ul>
    </aside>
  )
}

export default SideBar
