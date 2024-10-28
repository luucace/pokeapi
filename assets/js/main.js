document.getElementById('Button').addEventListener('click', fetchPokemon);

function fetchPokemon() {
    const pokemonId = document.getElementById('pokemonId').value;
    const pokemonContainer = document.getElementById('pokemonContainer');
    pokemonContainer.innerHTML = '';

    if (!pokemonId) {
    pokemonContainer.innerHTML = '<p>Por favor, ingrese un número.</p>';
    return;
    }


    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => {
    if (!response.ok) {
        throw new Error('Pokémon no encontrado.');
    }
    return response.json();
    })
    .then(data => renderPokemonCard(data))
    .catch(error => {
    pokemonContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

function renderPokemonCard(data) {
    const pokemonContainer = document.getElementById('pokemonContainer');

    const name = data.name;
    const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
    const height = data.height / 10; 
    const weight = data.weight / 10; 
    const imageUrl = data.sprites.front_default;

    const cardHTML = `
    <div class="pokemon-card">
    <img src="${imageUrl}" alt="${name}">
    <h2>${name}</h2>
    <p><strong>Tipo:</strong> ${types}</p>
    <p><strong>Altura:</strong> ${height} m</p>
    <p><strong>Peso:</strong> ${weight} kg</p>
    </div>
    `;

    pokemonContainer.innerHTML = cardHTML;
}