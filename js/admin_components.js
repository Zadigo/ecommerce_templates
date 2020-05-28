var modalcomponent = {
    props: ["modalname"],
    template: "\
    <div>\
        <div v-for='(key, index) in keys' :key='key' :id='key'>\
            <div class='modal-content'>\
                <input :type='showinputs.type' :name='showinputs.name' :id='showinputs.id' />\
            </div>\
        </div>\
    </div>\
    ",
    data() {
        return {
            keys: [],
            modals: {
                modal3: {type: "text", name: "title", id: "title"},
                modal4: {type: "file", name: "image", id: "image"}
            }
        }
    },
    beforeMount() {
        var keys = Object.keys(this.$data.modals)
        this.$data.keys = keys
    },
    computed: {
        modalitems() {
            var keys = Object.keys(this.$data.modals)
            return keys
        },
        showinputs() {
            return this.$data.modals[this.$props.modalname]
        }
    }
}

var actionbuttons = {
    props: ["actions"],
    template: "\
    <div class='fixed-action-btn'>\
        <a class='btn-floating btn-large red'>\
            <i class='large material-icons'>mode_edit</i>\
        </a>\
        <ul>\
            <li v-for='action in actions' :key='action.id'>\
                <a @click='showmodal(action.modalname)' :href='action.modalname|hashtag'\
                         class='btn-floating modal-trigger' :class='action.color'>\
                    <i class='material-icons'>{{ action.iconname }}</i>\
                </a>\
            </li>\
        </ul>\
    </div>\
    ",
    methods: {
        showmodal: function(name) {
            this.$emit("showmodal", name)
        }
    },
    filters: {
        hashtag: function(item) {
            return "#" + item
        }
    }
}

var admincomponents = new Vue({
    el: "#admin_components",
    components: {actionbuttons},
    data() {
        return {
            actions: [
                {id: 1, iconname:"image", color: "red", modalname: "modal3"},
                {id: 2, iconname:"title", color: "blue", modalname: "modal4"}
            ],
            modalname: "modal3",
            elem: undefined
        }
    },
    beforeMount() {
        var self = this
        self.$data.elem = $(self.$data.modalname)
    },
    methods: {
        domodal: function(name, element) {
            var self = this
            var instance = M.Modal.getInstance(self.$data.elem);
            instance.open()
        }
    }
})