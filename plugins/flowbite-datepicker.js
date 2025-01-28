export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/flowbite@0.0.1/dist/datepicker.js';
    script.async = true;
    document.body.appendChild(script);
  }
});
