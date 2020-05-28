var trigger2 = {
    template: "\
    <a @click='triggerdropdown'>\
        <i class='material-icons'>shopping_cart</i>\
    </a>\
    ",
    methods: {
        triggerdropdown: function() {
            this.$emit("triggerdropdown", "account")
        }
    }
}

var searchicontrigger = {
    template: "\
    <a @click.stop='triggerdropdown'>\
        <i class='material-icons'>search</i>\
    </a>\
    ",
    methods: {
        triggerdropdown: function() {
            this.$emit("triggerdropdown", "search")
        }
    }
}

var searchbar = {
    props: ["searchstate"],
    template: "\
    <!--<transition name='drop'>-->\
        <div v-if='searchstate' class='search-bar'>\
            <div class='wrapper'>\
                <input @keypress.enter='dosearch' v-bind='searchvalue' class='browser-default' type='search' name='search' id='search' placeholder='Rechercher' autocomplete='off'>\
                <i @click='triggerdropdown' class='material-icons'>close</i>\
            </div>\
        </div>\
    <!--</transition>-->\
    ",
    data() {
        return {
            searchvalue: ""
        }
    },
    methods: {
        dosearch: function() {
            $.ajax({
                type: "GET",
                url: window.location.href = "/search.html",
                success: function (response) {}
            });
        },
        triggerdropdown: function() {
            this.$emit("triggerdropdown", "search")
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
                        <img src='../../assets/images/image3.jpg' alt=''>\
                        <div class='link-title'>Sacs</div>\
                    </a>\
                    <a href='#!'>\
                        <img src='../../assets/images/image3.jpg' alt=''>\
                        <div class='link-title'>Cabas</div>\
                    </a>\
                    <img src='../../assets/images/image1.jpg' class='hide' alt=''>\
                </div>\
            </div>\
        </div>\
    </transition>\
    ",
    data() {
        return {
            sections: [
                {links: [
                    {name: "Chaussures", link: ""},
                    {name: "Robes", link: ""},
                    {name: "Vêtements", link: ""}
                ]}
            ]
        }
    }
}

var navbar = new Vue({
    el: "#vue_navbar",
    components: {dropdownbar, searchbar, searchicontrigger},
    data() {
        return {
            searchstate: false,
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
        initiatedropdown: function(name) {
            if (name === "search") {
                // setInterval(function() {$("#search").focus()}, 500)
                this.$data.dropdownstate = false
                // this.fadebackground()
                this.$data.searchstate = !this.$data.searchstate
            }

            if (name === "account") {
                this.$data.searchstate = false
                this.$data.dropdownstate = !this.$data.dropdownstate
            }
        }
    }
})