<template>
  <div class="container">
    <div class="row">
      <img alt="logo" src="@/assets/Logo.svg" class="logo">
    </div>
    <div class="row">
      <span class="logo-text">Trust the way banking for 3,000+ SMEs and startups in Singapore</span>
    </div>
    <div class="row menu-item-section">
      <router-link class="row menu-item" to="/"><img src="@/assets/Home.svg" alt="Home" class="menu-item-logo">Home</router-link>
      <router-link class="row menu-item" to="/cards"><img src="@/assets/Cards.svg" alt="Cards" class="menu-item-logo">Cards</router-link>
      <router-link class="row menu-item" to="/payments"><img src="@/assets/Payments.svg" alt="Payments" class="menu-item-logo">Payments</router-link>
      <router-link class="row menu-item" to="/credit"><img src="@/assets/Credit.svg" alt="Credit" class="menu-item-logo">Credit</router-link>
      <router-link class="row menu-item" to="/settings"><img src="@/assets/Settings.svg" alt="Settings" class="menu-item-logo">Settings</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
})
export default class Menu extends Vue {
  msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.logo {
  height: 28px;
  width: 145px;
}
.logo-text {
  font-size: small;
  color: #717896;
  padding-top: 12px;
}
.menu-item-section {
  padding-top: 12px;
}
.menu-item {
  padding: 20px;
  margin-top: 18px;
  font-size: small;
  color: #dddcdc;
}
.menu-item-logo {
  height:20px;
  width:50px;
}
</style>
