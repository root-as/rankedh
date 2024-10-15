
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
                highestRankItem = `${itemName.trim()} (Rank: ${highestRank})`;
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
