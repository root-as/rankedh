
// Your JavaScript code (fetching JSON, comparing lists, etc.)
async function fetchJsonData() {
    const response = await fetch('cards.json'); // Fetch the JSON file
    return await response.json();
}

function compareDeckList(deckList, itemsData) {
    const deckLines = deckList.split('\n');
    let highestRank = 0;
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
                highestRankItem = `${highestRank}`;

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

// Function to display cards
async function displayRankCards() {
    const itemsData = await fetchJsonData();

    // Clear previous cards in each rank section
    for (let rank = 0; rank <= 4; rank++) {
        const cardContainer = document.querySelector(`#rank${rank} .card-container`);
        cardContainer.innerHTML = ''; // Clear existing cards
    }

    // Sort and display cards by rank
    itemsData.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <img src="${card.image}" alt="${card.item}">
            <p>${card.item}</p>
        `;

        // Append the card to the appropriate rank section
        const cardContainer = document.querySelector(`#rank${card.rank} .card-container`);
        cardContainer.appendChild(cardDiv);
    });
}

// Call the function to display cards on page load
document.addEventListener('DOMContentLoaded', displayRank4Cards);