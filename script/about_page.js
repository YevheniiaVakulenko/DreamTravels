const teamMembers = [
    { name: "John Doe", role: "Founder & CEO", photo: "/DreamTravels/people/p1.jpg" },
    { name: "Jane Smith", role: "Travel Consultant", photo: "/DreamTravels/people/p2.jpg" },
    { name: "Emily Johnson", role: "Customer Support Specialist", photo: "/DreamTravels/people/p3.jpg" },
    { name: "Michael Brown", role: "Marketing Manager", photo: "/DreamTravels/people/p4.png" }
];

document.addEventListener('DOMContentLoaded', () => {
    const teamContainer = document.getElementById('team-container');

    if (teamContainer) {
        teamMembers.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.classList.add('member');

            memberDiv.innerHTML = `
                <img src="${member.photo}" alt="${member.name}">
                <div>
                    <span>${member.name}:</span> ${member.role}
                </div>
            `;

            teamContainer.appendChild(memberDiv);
        });
    } else {
        console.error('team-container not found!');
    }
});