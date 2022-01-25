const baseURL = "http://127.0.0.1:3000/api";
window.addEventListener('load', () => {

    const app = Vue.createApp({
        data() {
            return {
                books: [],
                genres: [],
                corridors: [],
                bookIndex: -1,
                book: {
                    genre: '',
                    corridor: '',
                    id: '',
                    author: '',
                    title: '',
                    pubDate: '',
                    status: '',
                },
                putResult: "",
                postResult: ""
            }
        },
        created() {
            this.listBooks();
            this.listGenres();
            this.listCorridors();
        },
        methods: {
            listBooks: async function() {
                const res = await fetch('http://127.0.0.1:3000/api/book/list');
                const data = await res.json();
                this.books = data;
            },
            listGenres: async function() {
                const res = await fetch('http://127.0.0.1:3000/api/genre/list');
                const data = await res.json();
                this.genres = data;
            },
            listCorridors: async function() {
                const res = await fetch('http://127.0.0.1:3000/api/corridor/list');
                const data = await res.json();
                this.corridors = data;
            },
            processBook: function(event) {},
            updateBook: function(id, event) {
                const bookFound = this.books.find((book, index) => {
                    this.bookIndex = index;
                    return book.id == id;
                });
                this.book.genre = bookFound.genre;
                this.book.corridor = bookFound.corridor;
                this.book.id = bookFound.id;
                this.book.author = bookFound.author;
                this.book.title = bookFound.title;
                this.book.pubDate = bookFound.pubDate;
                this.book.status = bookFound.status;
            },
            createId: function() {
                var genre = this.$refs.genre.value;
                const libros = this.books;
                var ids = [];
                libros.forEach(element => {
                    if (element.id.includes(genre)) {
                        //console.log(`Genero ${genre} aparece en ${element.id}`);
                        ids.push(element.id.slice(4, 8));
                    }
                });
                //console.log(ids);
                //console.log("Maximo valor", Math.max.apply({}, ids));
                if (ids.length == 0) { ids.push(0000) }
                const newIdNumeric = "".concat(Math.max.apply({}, ids) + 1);
                var newId = '';
                //console.log("Nuevo Valor> ", newIdNumeric);
                //console.log(newIdNumeric);
                if (newIdNumeric.length == 3) {
                    newId = '0'.concat(newIdNumeric);
                }
                if (newIdNumeric.length == 2) {
                    newId = '00'.concat(newIdNumeric);
                }
                if (newIdNumeric.length == 1) {
                    newId = '000'.concat(newIdNumeric);
                }
                if (newIdNumeric.includes('Infinity')) {
                    newId = '000'.concat(1);
                }
                return newId;
            },
            async postData(event) {
                const id = this.createId();
                const postData = {
                    genre: this.$refs.genre.value,
                    corridor: this.$refs.corridor.value,
                    id: this.$refs.genre.value + this.$refs.corridor.value + id,
                    author: this.$refs.author.value,
                    title: this.$refs.title.value,
                    pubDate: this.$refs.pubDate.value,
                    status: 2,
                };
                console.log("posdata", postData);
                try {
                    const res = await fetch(`${baseURL}/book/save`, {
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
                    const vid = this.createId();
                    const putData = {
                        genre: this.book.genre,
                        corridor: this.book.corridor,
                        id: this.$refs.genre.value + this.$refs.corridor.value + vid,
                        author: this.$refs.author.value,
                        title: this.$refs.title.value,
                        pubDate: this.$refs.pubDate.value,
                        status: this.$refs.status.value,
                    };

                    try {
                        const res = await fetch(`${baseURL}/book/update/${id}`, {
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
            async putData2(id, event) {
                if (id) {
                    const putData = {};

                    try {
                        const res = await fetch(`${baseURL}/book/delete/${id}`, {
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
                this.book.genre = '';
                this.book.corridor = '';
                this.book.id = '';
                this.book.author = '';
                this.book.title = '';
                this.book.pubDate = '';
                this.book.status = '';
            },
        }
    });


    app.mount('#app');

});