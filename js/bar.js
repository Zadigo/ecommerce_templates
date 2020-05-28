var trigger1 = {
    template: "\
    <a href='#!' @click='triggerdropdown'>Trigger</a>\
    ",
    methods: {
        triggerdropdown: function() {
            this.$emit("triggerdropdown")
        }
    }
}

var dropdownbar = {
    props: ["dropdownstate"],
    template: "\
    <transition name='drop'>\
        <div v-if='dropdownstate' class='ecommerce-dropdown'>\
            <div class='layout'>\
                <div class='links'>\
                    <div class='title'>Chaussures</div>\
                    <ul>\
                        <li><a href='#!'>Bottines</a></li>\
                        <li><a href='#!'>Escarpins</a></li>\
                    </ul>\
                </div>\
                <div class='links'>\
                    <div class='title'>Vêtements</div>\
                    <ul>\
                        <li><a href='#!'>Bottines</a></li>\
                        <li><a href='#!'>Escarpins</a></li>\
                    </ul>\
                </div>\
                <div class='image linked-to'>\
                    <a href='#!'>\
                        <div class='link-title'>Sacs</div>\
                        <img src='../../assets/images/image3.jpg' alt=''>\
                    </a>\
                    <a href='#!'>\
                        <div class='link-title'>Cabas</div>\
                        <img src='../../assets/images/image3.jpg' alt=''>\
                    </a>\
                    <img src='../../assets/images/image1.jpg' class='hide' alt=''>\
                </div>\
            </div>\
        </div>\
    </transition>\
    ",
    data() {
        return {}
    }
}

var app = new Vue({
    el: "#vue_ecommerce_bar",
    components: {dropdownbar, trigger1},
    data() {
        return {
            dropdownstate: false
        }
    },
    methods: {
        fadebackground: function() {
            if (this.$data.searchstate != true) {
                $(".overlay").css({"display": "inherit"})
            } else {
                $(".overlay").css({"display": "none"})
            }
        },
        initiatedropdown: function() {
            this.$data.dropdownstate = !this.$data.dropdownstate
        }
    }
})