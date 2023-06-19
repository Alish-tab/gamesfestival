<template>

        <div class="top-menu text-center" v-if="screenWidth > 768">

            <nuxt-link v-slot="{navigate}" to="/">
                <img 
            src="@/assets/images/logo.svg" 
            alt="logo" 
            style="max-height: 100px; max-width: 100px"
            @click="navigate"
            />
            </nuxt-link >
            
            <div>
                <v-menu open-on-hover bottom offset-y v-for="(tab,index) in tabs" :key="index">

                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-if="tab.items.length!==0"
                            text
                            x-large
                            v-bind="attrs"
                            v-on="on"
                            color="#57606f"
                        >
                        <v-icon>{{tab.icon}}</v-icon>
                            {{tab.title}} 
                        </v-btn>
                        <v-btn
                            v-if="tab.items.length===0"
                            text
                            x-large
                            v-bind="attrs"
                            v-on="on"
                            color="#57606f"
                            :to="tab.link"
                        >
                        <v-icon>{{tab.icon}}</v-icon>
                            {{tab.title}} 
                        </v-btn>
                    </template>

                    <v-list v-if="tab.items.length!==0">
                        <v-list-item
                        v-for="(item, index) in tab.items"
                        :key="index"
                        :to="item.link"
                        >
                            <a>{{ item.title }}</a>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
            <div>
                <slot></slot>
            </div>
        </div>
        <v-card class="navigate-menu" v-else-if="screenWidth < 768">
            <v-app-bar :elevation="0" rounded color="white">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-spacer></v-spacer>
                <nuxt-link v-slot="{navigate}" to="/">
                    <img 
                        src="@/assets/images/logo.svg" 
                        alt="logo" 
                        style="max-height: 100px; max-width: 100px"
                        @click="navigate"
                    />
                </nuxt-link >
            </v-app-bar>

            <v-navigation-drawer
                v-model="drawer"
                height="90vh"
                width="100vw"
                clipped
                temporary
                right
            >
                <v-list 
                    v-for="(tab,index) in tabs" 
                    :key="index"
                >
                    <v-list-item v-if="tab.items.length===0" :to="tab.link">
                        <v-list-item-icon>
                            <v-icon>{{tab.icon}}</v-icon>
                        </v-list-item-icon>
                
                        <v-list-item-title>{{tab.title}}</v-list-item-title>
                    </v-list-item>
                    <v-list-group
                        v-if="tab.items.length!==0"
                        :prepend-icon="tab.icon"
                        no-action
                    >
                        <template v-slot:activator>
                            <v-list-item-content>
                            <v-list-item-title>{{tab.title}}</v-list-item-title>
                            </v-list-item-content>
                        </template>
                
                        <v-list-item
                            v-for="(item, index) in tab.items"
                            :key="index"
                            :to="item.link"
                        >
                            <v-list-item-content>
                            <v-list-item-title>{{item.title}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list>
                <template v-slot:append>
                    <div class="text-center">
                        <slot></slot>
                    </div>
                </template>
            </v-navigation-drawer>
        </v-card>
    
</template>

<script>
export default {
    name:"TopMenu",
    props:{
        tabs:{
            type:Array,
            required:true,
        }
    },
   mounted() {
    this.updateScreenWidth();
    this.onScreenResize();
  },

    data() {
        return{
            menuMode:"",
            drawer: false,
            group: null,
            screenWidth: 0
        }
    },
    methods: {
    onScreenResize() {
      window.addEventListener("resize", () => {
        this.updateScreenWidth();
      });
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
  },
}
</script>

<style lang="scss" scoped>
.top-menu{
    padding: 10px 10px;
    box-shadow: 0 2px 5px rgba(39, 39, 42, 0.1);
    display: flex;
    justify-content: space-between;
    z-index: 10000;
}
.navigate-menu{
    box-shadow: 0 2px 5px rgba(39, 39, 42, 0.1);
    z-index: 10000;
    max-height: 60px;
}

.v-list-item{
    a {
        color: #a4b0be;
        text-decoration: none;
    }

    &:hover{
        background-color: rgba(39, 39, 42, 0.058);
        a {
            color: #57606f;
        }
    }
}

</style>