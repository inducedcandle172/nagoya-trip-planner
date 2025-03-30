// Itinerary data
const itineraryData = {
    1: {
        title: "Arrival & Nagoya Highlights",
        hotel: "Richmond Hotel Nagoya Nayabashi",
        hotelAddress: "3-14-21 Meieki, Nakamura Ward, Nagoya",
        transport: "Walk from Nagoya Station (10 mins)",
        activities: [
            {
                time: "8:00 AM",
                title: "Breakfast at hotel",
                location: "Richmond Hotel Nagoya Nayabashi",
                notes: "Start your day with a hearty breakfast"
            },
            {
                time: "9:30 AM - 12:00 PM",
                title: "Nagoya Castle",
                location: "1-1 Honmaru, Naka Ward",
                notes: "Visit Honmaru Palace (¥500/person)",
                mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.8280305550287!2d136.8993143152582!3d35.185589979999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600376e5d27e13e7%3A0x3c0c0c0c0c0c0c0c!2sNagoya%20Castle!5e0!3m2!1sen!2sjp!4v1620000000000!5m2!1sen!2sjp",
                bookingUrl: "https://www.nagoyajo.city.nagoya.jp/en/",
                website: "https://www.nagoyajo.city.nagoya.jp/en/"
            },
            {
                time: "12:30 PM - 1:30 PM",
                title: "Lunch at Yabaton",
                location: "3-6-18 Osu, Naka Ward",
                notes: "Try the famous miso katsu",
                mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.8280305550287!2d136.8993143152582!3d35.185589979999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600376e5d27e13e7%3A0x3c0c0c0c0c0c0c0c!2sYabaton!5e0!3m2!1sen!2sjp!4v1620000000000!5m2!1sen!2sjp",
                website: "https://www.yabaton.com/"
            },
            {
                time: "2:00 PM - 4:00 PM",
                title: "Noritake Garden",
                location: "3-1-36 Noritakeshinmachi, Nishi Ward",
                notes: "Free entry to garden, museum ¥500/person",
                mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.8280305550287!2d136.8993143152582!3d35.185589979999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600376e5d27e13e7%3A0x3c0c0c0c0c0c0c0c!2sNoritake%20Garden!5e0!3m2!1sen!2sjp!4v1620000000000!5m2!1sen!2sjp",
                website: "https://www.noritake.co.jp/eng/museum/"
            },
            {
                time: "5:00 PM - 7:00 PM",
                title: "Osu Kannon Shopping Street",
                location: "Osu, Naka Ward",
                notes: "Try Kishimen noodles, retro gaming shops",
                mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.8280305550287!2d136.8993143152582!3d35.185589979999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600376e5d27e13e7%3A0x3c0c0c0c0c0c0c0c!2sOsu%20Kannon!5e0!3m2!1sen!2sjp!4v1620000000000!5m2!1sen!2sjp"
            },
            {
                time: "7:30 PM",
                title: "Dinner at Atsuta Horaiken",
                location: "Atsuta Ward, Jingu 2-10-26",
                notes: "Try hitsumabushi (reservation required)",
                mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.8280305550287!2d136.8993143152582!3d35.185589979999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600376e5d27e13e7%3A0x3c0c0c0c0c0c0c0c!2sAtsuta%20Horaiken!5e0!3m2!1sen!2sjp!4v1620000000000!5m2!1sen!2sjp",
                website: "https://www.horaiken.com/",
                bookingUrl: "https://www.horaiken.com/reservation/"
            }
        ]
    },
    // Add more days here...
};

// Modal elements
const modal = document.getElementById('dayModal');
const dayDetails = document.getElementById('dayDetails');
const closeBtn = document.getElementsByClassName('close')[0];

// Show day details
function showDayDetails(day) {
    const dayData = itineraryData[day];
    if (!dayData) return;

    let html = `
        <h2>Day ${day}: ${dayData.title}</h2>
        <div class="day-info">
            <p><strong>Hotel:</strong> ${dayData.hotel}</p>
            <p><strong>Address:</strong> ${dayData.hotelAddress}</p>
            <p><strong>Transport:</strong> ${dayData.transport}</p>
        </div>
        <div class="day-details">
    `;

    dayData.activities.forEach(activity => {
        html += `
            <div class="activity-item">
                <div class="activity-time">${activity.time}</div>
                <div class="activity-location">${activity.title}</div>
                <div class="activity-address">${activity.location}</div>
                <div class="activity-notes">${activity.notes}</div>
                ${activity.mapUrl ? `
                    <div class="map-container">
                        <iframe
                            width="100%"
                            height="200"
                            frameborder="0"
                            style="border:0"
                            src="${activity.mapUrl}"
                            allowfullscreen>
                        </iframe>
                    </div>
                ` : ''}
                <div class="activity-links">
                    ${activity.website ? `<a href="${activity.website}" target="_blank" class="btn">Website</a>` : ''}
                    ${activity.bookingUrl ? `<a href="${activity.bookingUrl}" target="_blank" class="btn">Book Now</a>` : ''}
                </div>
            </div>
        `;
    });

    html += '</div>';
    dayDetails.innerHTML = html;
    modal.style.display = 'block';
}

// Close modal
closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
} 