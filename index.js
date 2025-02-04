
const API_KEY = '2d2e399b';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`

async function searchMovies() {
	const query = document.getElementById('searchInput').value
	if (query.trim() === '') {
		alert('Please enter a movie name.')
		return
	}

	const url = `${API_URL}&s=${encodeURIComponent(query)}`

	try {
		const response = await fetch(url)
		const data = await response.json()

		if (data.Response === 'True') {
			displayMovies(data.Search)
		} else {
			alert(data.Error)
		}
	} catch (error) {
		console.error('Error fetching data:', error)
	}
}

function displayMovies(movies) {
	const moviesContainer = document.getElementById('moviesContainer')
	moviesContainer.innerHTML = ''

	movies.forEach(movie => {
		const movieElement = document.createElement('div')
		movieElement.classList.add('movie')

		movieElement.innerHTML = `
            <h3>${movie.Title} (${movie.Year})</h3>
            <img src="${
							movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'
						}" alt="${movie.Title} poster" style="width:100px;">
            <p>Type: ${movie.Type}</p>
        `

		moviesContainer.appendChild(movieElement)
	})
}
