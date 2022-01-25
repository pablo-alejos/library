const baseURL = "http://127.0.0.1:3000/api";
window.addEventListener('load', () => {

    const app = Vue.createApp({
        data() {
            return {
                genres: [],
                genreIndex: -1,
                genre: {
                    id: '',
                    desc: '',
                },
                putResult: "",
                postResult: ""
            }
        },
        created() {
            this.listgenres();
        },
        methods: {
            listgenres: async function() {
                const res = await fetch('http://127.0.0.1:3000/api/genre/list');
                const data = await res.json();
                this.genres = data;
            },
            updategenre: function(id, event) {
                const genreFound = this.genres.find((genre, index) => {
                    this.genreIndex = index;
                    return genre.id == id;
                });
                this.genre.desc = genreFound.desc;
                this.genre.id = genreFound.id;
            },
            async postData(event) {
                const postData = {
                    desc: this.$refs.desc.value,
                    id: this.$refs.id.value,
                };
                console.log("posdata", postData);
                try {
                    const res = await fetch(`${baseURL}/genre/save`, {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(postData),
                    });

                    if (!res.ok) {
                        const message = `An error has occured: ${res.status} - ${res.statusText}`;
                        throw new Error(message);
                    }

                    const data = await res.json();

                    const result = {
                        status: res.status + "-" + res.statusText,
                        headers: {
                            "Content-Type": res.headers.get("Content-Type"),
                            "Content-Length": res.headers.get("Content-Length"),
                        },
                        data: data,
                    };

                    this.postResult = this.fortmatResponse(result);
                } catch (err) {
                    this.postResult = err.message;
                } finally { this.clearFields(); }
            },
            fortmatResponse(res) {
                return JSON.stringify(res, null, 2);
            },
            async putData(id, event) {
                if (id) {
                    const putData = {
                        desc: this.$refs.desc.value,
                        id: id,
                    };

                    try {
                        const res = await fetch(`${baseURL}/genre/update/${id}`, {
                            method: "put",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(putData),
                        });

                        if (!res.ok) {
                            const message = `An error has occured: ${res.status} - ${res.statusText}`;
                            throw new Error(message);
                        }

                        const data = await res.json();

                        const result = {
                            status: res.status + "-" + res.statusText,
                            headers: { "Content-Type": res.headers.get("Content-Type") },
                            data: data,
                        };

                        this.putResult = this.fortmatResponse(result);
                    } catch (err) {
                        this.putResult = err.message;
                    }
                }
            },
            clearPutOutput() {
                this.putResult = null;
            },
            clearFields: function() {
                this.genre.desc = '';
                this.genre.id = '';
            },
        }
    });


    app.mount('#app');

});