const baseURL = "http://127.0.0.1:3000/api";
window.addEventListener('load', () => {

    const app = Vue.createApp({
        data() {
            return {
                users: [],
                userIndex: -1,
                user: {
                    name: '',
                    captureDate: '',
                    id: '',
                },
                putResult: "",
                postResult: ""
            }
        },
        created() {
            this.listUsers();
        },
        mounted() {},
        methods: {
            listUsers: async function() {
                const res = await fetch('http://127.0.0.1:3000/api/user/list');
                const data = await res.json();
                this.users = data;
                let date = new Date().getFullYear();
                this.users.forEach(element => {
                    if (!element.id.slice(0, 4).includes(date)) {
                        this.putNewYear(element);
                    }
                });
            },
            putNewYear: async function(element) {
                let date = new Date().getFullYear();
                console.log("reciving element: ", element);
                const idOrg = element.id;
                element.id = this.updateId(element.id, date);
                const putData = {
                    name: element.name,
                    captureDate: element.captureDate,
                    id: element.id,
                };
                const res = await fetch(`${baseURL}/user/update/${idOrg}`, {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(putData),
                });
            },
            updateId: function(id, date) {
                const str = id.slice(4, 9)
                return date.toString().concat(str);
            },
            updateUser: function(id, event) {
                const userFound = this.users.find((user, index) => {
                    this.userIndex = index;
                    return user.id == id;
                });
                this.user.name = userFound.name;
                this.user.captureDate = userFound.captureDate;
                this.user.id = userFound.id;
            },
            createId: function() {
                //const cd = this.$refs.captureDate.value;
                const usuarios = this.users;
                //var r = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
                const ids = [];
                usuarios.forEach(element => {
                    ids.push(element.id.slice(4, 9));
                });
                const newIdNumeric = "".concat(Math.max.apply({}, ids) + 1);
                var newId = "";
                if (newIdNumeric.length == 5) {
                    newId = ''.concat(newIdNumeric);
                }
                if (newIdNumeric.length == 4) {
                    newId = '0'.concat(newIdNumeric);
                }
                if (newIdNumeric.length == 3) {
                    newId = '00'.concat(newIdNumeric);
                }
                if (newIdNumeric.length == 2) {
                    newId = '000'.concat(newIdNumeric);
                }
                if (newIdNumeric.length == 1) {
                    newId = '0000'.concat(newIdNumeric);
                }
                if (newIdNumeric.includes('Infinity')) {
                    newId = '0000'.concat(1);
                }
                console.log(newIdNumeric);
                var vdate = this.$refs.captureDate.value;
                const year = vdate.slice(6, 10);
                const fullId = year.concat(newId);
                return fullId;
            },
            async postData(event) {
                const vid = this.createId();
                const postData = {
                    name: this.$refs.name.value,
                    captureDate: this.$refs.captureDate.value,
                    id: vid,
                };
                console.log("posdata", postData);
                try {
                    const res = await fetch(`${baseURL}/user/save`, {
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
                        name: this.$refs.name.value,
                        captureDate: this.$refs.captureDate.value,
                        id: id,
                    };

                    try {
                        const res = await fetch(`${baseURL}/user/update/${id}`, {
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
                this.user.name = '';
                this.user.captureDate = '';
                this.user.id = '';
            },
        }
    });


    app.mount('#app');

});