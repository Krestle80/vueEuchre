import { createApp } from 'vue';
import App from '@/views/layouts/app';
import BalmUI from 'balm-ui'; // Official Google Material Components
const app = createApp(App);

app.use(BalmUI); // Mandatory

app.mount('#app');
