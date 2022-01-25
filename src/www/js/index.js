const baseURL = "http://127.0.0.1:3000/";
window.addEventListener('load', () => {

    const app = Vue.createApp({
        data() {
            return {
                postResult: baseURL,
            }
        },
        created() {},
        methods: {}
    });


    app.mount('#app');

});