document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('messageForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
            alert('Please fill in all fields!');
            return;
        }

        alert(`Form Submitted Successfully!`);
        form.reset();
    });
});
