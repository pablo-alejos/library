const baseURL = "http://127.0.0.1:3000/api";
window.addEventListener('load', () => {

    const app = Vue.createApp({
        data() {
            return {
                borrows: [],
                borrowIndex: -1,
                borrow: {
                    user: '',
                    book: '',
                    id: '',
                },
                books: [],
                users: [],
                userIndex: -1,
                user: {
                    name: '',
                    captureDate: '',
                    id: '',
                },
                bbooks: [],
                putResult: "",
                postResult: ""
            }
        },
        created() {
            this.listBooks();
        },
        methods: {
            listBooks: async function() {
                const res = await fetch('http://127.0.0.1:3000/api/book/list');
                const data = await res.json();
                this.books = data;
            },
            getUser: async function(id, event) {
                event.preventDefault();
                const res = await fetch(`${baseURL}/user/${id}`);
                const data = await res.json();
                this.user = data[0];
            },
            listBorrows: async function(id) {
                const res = await fetch(`${baseURL}/borrow/list/${id}`);
                const data = await res.json();
                this.borrows = data;
            },
            processBorrow: function(event) {
                event.preventDefault();
            },
            populate: async function(id, event) {
                const res = await fetch(`${baseURL}/borrow/books/${id}`);
                const data = await res.json();
                this.bbooks = data;
                this.getUser(id, event);
            },
            async postData() {
                this.putData1(this.$refs.book.value);
                const postData = {
                    user: this.$refs.user.value,
                    book: this.$refs.book.value,
                };
                console.log("posdata", postData);
                try {
                    const res = await fetch(`${baseURL}/borrow/save`, {
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
                } finally {}
            },
            async putData1(id) {
                if (id) {
                    const putData = {};
                    try {
                        const res = await fetch(`${baseURL}/book/borrow/${id}`, {
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
            async putData2(id, ) {
                if (id) {
                    this.deleteDataById(id);
                    const putData = {};
                    try {
                        const res = await fetch(`${baseURL}/book/back/${id}`, {
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
            async deleteDataById(id) {
                if (id) {
                    try {
                        const res = await fetch(`${baseURL}/borrow/delete/${id}`, { method: "delete" });

                        const data = await res.json();

                        const result = {
                            status: res.status + "-" + res.statusText,
                            headers: { "Content-Type": res.headers.get("Content-Type") },
                            data: data,
                        };

                        this.deleteResult = this.fortmatResponse(result);
                    } catch (err) {
                        this.deleteResult = err.message;
                    }
                }
            },
            fortmatResponse(res) {
                return JSON.stringify(res, null, 2);
            },
            clearPutOutput() {
                this.putResult = null;
                this.postResult = null;
            },
            clearFields: function() {
                this.borrow.user = '';
                this.borrow.book = '';
            },
        }
    });


    app.mount('#app');

});