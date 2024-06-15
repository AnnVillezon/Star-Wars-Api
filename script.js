document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('#search-button');
    const searchInput = document.querySelector('#search');
    const characterList = document.querySelector('.character-list');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchCharacter(query);
        }
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchCharacter(query);
            }
        }
    });

    async function searchCharacter(query) {
        const response = await fetch(`https://swapi.dev/api/people/?search=${query}`);
        const data = await response.json();
        displayCharacters(data.results);
        searchInput.value = ''; // sökfältet automatisk rensare
    }

    function displayCharacters(characters) {
        characterList.innerHTML = '';
        characters.forEach(character => {
            const listItem = document.createElement('li');
            listItem.classList.add('character-list-item');
            listItem.innerHTML = `
                <h2>${character.name}</h2>
                <div class="character-info">
                    <p>Height: ${character.height}</p>
                    <p>Mass: ${character.mass}</p>
                    <p>Hair Color: ${character.hair_color}</p>
                    <p>Skin Color: ${character.skin_color}</p>
                    <p>Eye Color: ${character.eye_color}</p>
                    <p>Birth Year: ${character.birth_year}</p>
                    <p>Gender: ${character.gender}</p>
                </div>
            `;
            listItem.addEventListener('click', () => {
                listItem.classList.toggle('active');
            });
            characterList.appendChild(listItem);
        });
    }
});

