<template>
  <div class="container">
    <div class="row main">
      <!-- <div class="col-1"></div> -->
      <div class="col-3 menu">
        <Menu/>
      </div>
      <div class="col-9 content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Menu from '@/components/Menu.vue'; // @ is an alias to /src

@Options({
  components: {
    Menu
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1d4a77;
}
.menu {
  background-color: #05315e;
  padding-top: 30px;
  margin-left: -25px;
}
.content {
  min-height: 572px;
  margin-left: 25px;
}
</style>
