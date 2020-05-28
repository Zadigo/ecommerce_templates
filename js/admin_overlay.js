const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3

var actionbutton = {
    props: ["icon"],
    template: "\
    <button class='btn-floating btn-large waves-effect waves-light blue'>\
        <i class='material-icons'>{{ icon }}</i>\
    </button>\
    "
}

var adminapp = new Vue({
    el: "#admin",
    components: {actionbutton},
    template: "\
    <div class='content'>\
        <button @click='show=!show' class='btn-large'><i class='material-icons left'>dashboard</i>Admin tools</button>\
        <div v-if='show' class='wrapper' id='admin'>\
            <h4 class='panel-title'>Admin tools</h4>\
            <div @click='show = !show' class='close-button'>\
                <i class='material-icons'>clear</i>\
            </div>\
            <div class='new-image'>\
                <div v-if='cardpanelimage' class='card-panel'>\
                    <form @submit.prevent='sendimage'>\
                        <div class='input-field'>\
                            <input @change='getformdata' type='file' \
                                        name='new-image' id='new-image'>\
                        </div>\
                        <button v-if='false' type='submit' class='btn black waves-effect waves-light black'>Send</button>\
                        <div class='preloader-wrapper small' :class='{\"active\": issaving}'>\
                            <div class='spinner-layer spinner-blue-only'>\
                                <div class='circle-clipper left'>\
                                    <div class='circle'></div>\
                                </div>\
                                <div class='gap-patch'>\
                                    <div class='circle'></div>\
                                </div>\
                                <div class='circle-clipper right'>\
                                    <div class='circle'></div>\
                                </div>\
                            </div>\
                        </div>\
                    </form>\
                </div>\
                <button @click='showpanel(\"image\")' class='btn-floating btn-large waves-effect waves-light black'>\
                    <i class='material-icons'>image</i>\
                </button>\
            </div>\
            <div class='new-title'>\
                <div v-if='cardpaneltitle' class='card-panel'>\
                    <div class='input-field'>\
                        <input v-model='titletosend' type='text' name='title' id='title'>\
                    </div>\
                    <button @click='gettitle' class='btn black waves-effect waves-light black'>Send</button>\
                </div>\
                <button @click='showpanel(\"title\")' class='btn-floating btn-large waves-effect waves-light black'>\
                    <i class='material-icons'>title</i>\
                </button>\
            </div>\
        </div>\
    </div>\
    ",
    data() {
        return {
            show: false,
            cardpanelimage: false,
            cardpaneltitle: false,

            titletosend: "",
            
            formdata: {},

            currentstatus: STATUS_INITIAL
        }
    },
    computed: {
        isinitial() {
          return this.$data.currentstatus === STATUS_INITIAL;
        },
        issaving() {
          return this.$data.currentstatus === STATUS_SAVING;
        },
        issuccess() {
          return this.$data.currentstatus === STATUS_SUCCESS;
        },
        isfailed() {
          return this.$data.currentstatus === STATUS_FAILED;
        }
    },
    methods: {
        showpanel: function(name) {
            if (name === "title") {
                this.$data.cardpaneltitle = !this.$data.cardpaneltitle
                this.$data.cardpanelimage = false
            }
            if (name === "image") {
                this.$data.cardpanelimage = !this.$data.cardpanelimage
                this.$data.cardpaneltitle = false
            }
        },
        reset: function() {
            this.$data.currentStatus = STATUS_INITIAL;
            this.$data.titletosend = ""
        },
        gettitle: function() {
            const formdata = new FormData()
            formdata.append("title", this.$data.titletosend)
            this.sendimage(formdata)
        },
        getformdata: function(event) {
            const formdata = new FormData()
            var fileslist = event.target.files
            Object.keys(fileslist).forEach(key => {
                var image = fileslist[key]
                formdata.append("image1", image, image["name"])
            })
            this.sendimage(formdata)
        },
        sendimage: function(formdata) {
            var self = this
            var xhr = new XMLHttpRequest()
            xhr.open("POST", "https://jsonplaceholder.typicode.com/posts")
            xhr.setRequestHeader("Content-Type", "multipart/form-data" )
            xhr.send(formdata)
            self.$data.currentstatus = STATUS_SAVING
            xhr.onload = function() {
                self.$data.currentstatus = STATUS_SUCCESS
                self.reset()
            }
            xhr.onerror = function(response) {
                self.$data.currentstatus = STATUS_FAILED
            }
        }
    }
})