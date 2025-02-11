
// Your JavaScript code (fetching JSON, comparing lists, etc.)
async function fetchJsonData() {
    const response = await fetch('cards.json'); // Fetch the JSON file
    return await response.json();
}

function compareDeckList(deckList, itemsData) {
    const deckLines = deckList.split('\n');
    let highestRank = 0;
    let highestRankItem = '';
    const rankCounts = {}; // To track the count of cards for each rank

    // Check if the deck has more than 100 cards
    if (deckLines.length > 100) {
        return 'Deck list exceeds the maximum limit of 100 cards.';
    }

    deckLines.forEach(line => {
        const quantityAndItem = line.match(/^(\d+)\s(.+)$/);
        if (quantityAndItem) {
            const [, quantityStr, itemName] = quantityAndItem;
            const quantity = parseInt(quantityStr, 10);

            const matchedItem = itemsData.find(item => item.item.toLowerCase() === itemName.trim().toLowerCase());
            if (matchedItem) {
                const rank = matchedItem.rank;

                // Update the count for this rank
                if (!rankCounts[rank]) {
                    rankCounts[rank] = 0;
                }
                rankCounts[rank] += quantity;

                // Update the highest rank logic
                if (rank > highestRank) {
                    highestRank = rank;
                    highestRankItem = `Your deck is rank: ${highestRank}`;
                    if (highestRank === 6) {
                        highestRankItem = 'Your deck is BANNED';
                    }
                }
            }
        }
    });

    // Check if there are at least 3 cards of rank 3
    if (rankCounts[3] >= 3) {
        if (highestRank > 3) {
            highestRankItem = `Your deck is rank: ${highestRank}`;
        } else highestRankItem = 'Your deck is rank: 3 (Triggered by 3 or more rank 3 cards)';
    } else highestRankItem = 'Your deck is rank: 1 or 2';


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
    const rankCards5 = itemsData.filter(item => item.rank === 5);
    const rankCards4 = itemsData.filter(item => item.rank === 4);
    const rankCards3 = itemsData.filter(item => item.rank === 3);
    const rankCards2 = itemsData.filter(item => item.rank === 2);
    const rankCards1 = itemsData.filter(item => item.rank === 1);
    const rankCards6 = itemsData.filter(item => item.rank === 6); //BANNED

    const cardContainer5 = document.querySelector('.card-container-5');
    const cardContainer4 = document.querySelector('.card-container-4');
    const cardContainer3 = document.querySelector('.card-container-3');
    const cardContainer2 = document.querySelector('.card-container-2');
    const cardContainer1 = document.querySelector('.card-container-1');
    const cardContainer6 = document.querySelector('.card-container-6');

    rankCards5.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <img src="${card.image}" alt="${card.item}">
            <p>${card.item}</p>
        `;
        cardContainer5.appendChild(cardDiv);
    });

    rankCards4.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <img src="${card.image}" alt="${card.item}">
            <p>${card.item}</p>
        `;
        cardContainer4.appendChild(cardDiv);
    });

    rankCards3.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <img src="${card.image}" alt="${card.item}">
            <p>${card.item}</p>
        `;
        cardContainer3.appendChild(cardDiv);
    });

    rankCards2.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <img src="${card.image}" alt="${card.item}">
            <p>${card.item}</p>
        `;
        cardContainer2.appendChild(cardDiv);
    });

    rankCards1.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <img src="${card.image}" alt="${card.item}">
            <p>${card.item}</p>
        `;
        cardContainer1.appendChild(cardDiv);
    });

    // BANNED
    rankCards6.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <img src="${card.image}" alt="${card.item}">
            <p>${card.item}</p>
        `;
        cardContainer6.appendChild(cardDiv);
    });
}

// Call the function to display cards on page load
document.addEventListener('DOMContentLoaded', displayRankCards);