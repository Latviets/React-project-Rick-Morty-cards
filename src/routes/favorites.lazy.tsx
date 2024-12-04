import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/favorites')({
  component: Favorites,
})

function Favorites() {
  return <div className="p-2">Hello from Favorites!</div>
}
