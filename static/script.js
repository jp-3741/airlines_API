document.getElementById('search-button').addEventListener('click', function() {
    const originElement = document.getElementById('origin');
    const destinationElement = document.getElementById('destination');
    const cabinSelectionElement = document.getElementById('cabin');

    if (originElement && destinationElement && cabinSelectionElement) {
        const origin = originElement.value;
        const destination = destinationElement.value;
        const cabinSelection = cabinSelectionElement.value;

        const headers = {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9,hi;q=0.8',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        };

        const jsonData = {
            'origin': origin,
            'destination': destination,
            'partnerPrograms': [
                'Air Canada',
                'United Airlines',
                'KLM',
                'Qantas',
                'American Airlines',
                'Etihad Airways',
                'Alaska Airlines',
                'Qatar Airways',
                'LifeMiles',
            ],
            'stops': 2,
            'departureTimeFrom': '2024-07-09T00:00:00Z',
            'departureTimeTo': '2024-10-07T00:00:00Z',
            'isOldData': false,
            'limit': 302,
            'offset': 0,
            'cabinSelection': [cabinSelection],
            'date': new Date().toISOString(),
        };

        fetch('https://cardgpt.in/apitest', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(jsonData),
        })
        .then(response => response.json())
        .then(data => {
            const card1 = data.data[0];
            const card2 = data.data[1];

            document.getElementById('airline-name-1').textContent = card1.partner_program;
            document.getElementById('destination-1').textContent = `${jsonData.origin} -> ${jsonData.destination}`;
            document.getElementById('date-1').textContent = `${jsonData.departureTimeFrom.split('T')[0]} - ${jsonData.departureTimeTo.split('T')[0]}`;
            document.getElementById('business-miles-1').textContent = card1.min_business_miles ? card1.min_business_miles : 'N/A';
            document.getElementById('economy-miles-1').textContent = card1.min_economy_miles ? card1.min_economy_miles : 'N/A';
            document.getElementById('first-miles-1').textContent = card1.min_first_miles ? card1.min_first_miles : 'N/A';

            document.getElementById('airline-name-2').textContent = card2.partner_program;
            document.getElementById('destination-2').textContent = `${jsonData.origin} -> ${jsonData.destination}`;
            document.getElementById('date-2').textContent = `${jsonData.departureTimeFrom.split('T')[0]} - ${jsonData.departureTimeTo.split('T')[0]}`;
            document.getElementById('business-miles-2').textContent = card2.min_business_miles ? card2.min_business_miles : 'N/A';
            document.getElementById('economy-miles-2').textContent = card2.min_economy_miles ? card2.min_economy_miles : 'N/A';
            document.getElementById('first-miles-2').textContent = card2.min_first_miles ? card2.min_first_miles : 'N/A';
        })
        .catch(error => console.error('Error:', error));
    } else {
        console.error('One or more elements not found');
    }
});
