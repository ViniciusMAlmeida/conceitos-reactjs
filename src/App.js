import React, { useState, useEffect } from 'react'

import api from './services/api'

import './styles.css'

function App() {
  const [repositories, setProjects] = useState([])

  useEffect(() => {
    api.get('/repositories').then((response) => setProjects(response.data))
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: 'http://github.com/ViniciusMAlmeida',
      techs: ['dev', 'test', 'deploy'],
    })

    const repository = response.data

    setProjects([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const repositoryIndex = repositories.findIndex((repo) => repo.id === id)

    const repositoriesClone = repositories

    repositoriesClone.splice(repositoryIndex, 1)

    setProjects([...repositoriesClone])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
