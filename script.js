document.addEventListener('DOMContentLoaded', () => {
  const classContainer = document.getElementById('class-container');
  for (let i = 0; i <= 9; i++) {
    const section = document.createElement('div');
    section.className = 'class-section';
    section.innerHTML = `
      <h3>Class ${i}</h3>
      <label>Subject</label>
      <input type="text" name="class${i}_subject">
      <label>Teacher</label>
      <input type="text" name="class${i}_teacher">
      <label>Description</label>
      <textarea name="class${i}_description"></textarea>
    `;
    classContainer.appendChild(section);
  }

  const form = document.getElementById('survey-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const now = new Date();
    const start = new Date();
    const end = new Date();
    start.setHours(7, 30, 0);
    end.setHours(14, 30, 0);

    if (now >= start && now <= end) {
      alert("Form submission is inactive from 7:30 AM to 2:30 PM.");
      return;
    }

    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxcMdJmnMEFGwkU01i2JfNLP5HBiU06BwD5mUq8EGWwwn3QfqXzWrCWnfqnPI2NvtXaSQ/exec", {
        method: "POST",
        body: JSON.stringify(object),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();
      if (result.success) {
        alert("Form submitted successfully.");
        form.reset();
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      alert("Failed to submit form.");
      console.error(error);
    }
  });
});