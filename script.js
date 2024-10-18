
// Your JavaScript code (fetching JSON, comparing lists, etc.)
async function fetchJsonData() {
    const response = await fetch('cards.json'); // Fetch the JSON file
    return await response.json();
}

function compareDeckList(deckList, itemsData) {
    const deckLines = deckList.split('\n');
    let highestRank = -1;
    let highestRankItem = '';

    deckLines.forEach(line => {
        const quantityAndItem = line.match(/^(\d+)\s(.+)$/);
        if (quantityAndItem) {
            const [, quantity, itemName] = quantityAndItem;

            const matchedItem = itemsData.find(item => item.item.toLowerCase() === itemName.trim().toLowerCase());
            if (matchedItem && matchedItem.rank > highestRank) {
                highestRank = matchedItem.rank;
                // show card names
                // highestRankItem = `${itemName.trim()} (Rank: ${highestRank})`;

                // show rank only
                highestRankItem = 'Your deck is rank: ' + `${highestRank}`;
                if (highestRankItem === 0) {
                    highestRankItem = 'Your deck is BANNED'
                }

            }
        }
    });

    return highestRankItem || 'No matches found';
}

document.getElementById('submitButton').addEventListener('click', async () => {
    const deckList = document.getElementById('textField').value;
    const itemsData = await fetchJsonData();

    const result = compareDeckList(deckList, itemsData);
    document.getElementById('resultOutput').textContent = result;
});

// Function to display Rank 4 Cards
async function displayRankCards() {
    const itemsData = await fetchJsonData();
    const rankCards4 = itemsData.filter(item => item.rank === 4);
    const rankCards3 = itemsData.filter(item => item.rank === 3);
    const rankCards2 = itemsData.filter(item => item.rank === 2);
    const rankCards1 = itemsData.filter(item => item.rank === 1);
    const rankCards0 = itemsData.filter(item => item.rank === 0);

    const cardContainer4 = document.querySelector('.card-container-4');
    const cardContainer3 = document.querySelector('.card-container-3');
    const cardContainer2 = document.querySelector('.card-container-2');
    const cardContainer1 = document.querySelector('.card-container-1');
    const cardContainer0 = document.querySelector('.card-container-0');

    rankCards4.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <img src="https://cards.scryfall.io/normal/front/${card.image}" alt="${card.item}">
            <p>${card.item}</p>
        `;
        cardContainer4.appendChild(cardDiv);
    });

    rankCards3.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <img src="https://cards.scryfall.io/normal/front/${card.image}" alt="${card.item}">
            <p>${card.item}</p>
        `;
        cardContainer3.appendChild(cardDiv);
    });

    rankCards2.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <img src="https://cards.scryfall.io/normal/front/${card.image}" alt="${card.item}">
            <p>${card.item}</p>
        `;
        cardContainer2.appendChild(cardDiv);
    });

    rankCards1.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <img src="https://cards.scryfall.io/normal/front/${card.image}" alt="${card.item}">
            <p>${card.item}</p>
        `;
        cardContainer1.appendChild(cardDiv);
    });

    rankCards0.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <img src="https://cards.scryfall.io/normal/front/${card.image}" alt="${card.item}">
            <p>${card.item}</p>
        `;
        cardContainer0.appendChild(cardDiv);
    });
}

// Call the function to display cards on page load
document.addEventListener('DOMContentLoaded', displayRankCards);