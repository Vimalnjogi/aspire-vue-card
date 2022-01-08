<template>
  <div class="cards">
    <div v-if="!newCard">
      <div class="row">
        <div class="col-2 d-flex justify-content-start">
          <span style="font-size: 12px;">Available balance</span>          
        </div>
        <div class="col-10"></div>
      </div>
      <div class="row">
        <div class="col-2 d-flex justify-content-start">
          <span class="ranctangle-available-balance">S$</span>
          <span class="available-balance-amount">3,000</span>
        </div>
        <div class="col-10 d-flex justify-content-end">
          <button @click="newCardClick" class="new-card-button">
            <img src="@/assets/AddNewCard.svg" alt="New Card">
            New Card
          </button>
        </div>
      </div>
      <div class="row card-type">
        <div class="col-12 d-flex justify-content-start">
          <span class="my-debit-card">My debit cards</span>
          <span class="all-company-card">All company cards</span>
        </div>
      </div>
      <div class="row">
        <div class="col-12 card-box">
          <Card
            v-if="activeCard"
            :cardDetail="activeCard"
            @toggle-freeze-card="toggleFreezeCard"
            @cancel-card="cancelCard"
          >
            <div class="ranctangle center" :class="{activeCard: index - 1 === activeCardIndex}" v-for="index in cards.length" :key="index" @click="selectCard(index)"></div>
          </Card>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="form-row" style="text-align: -webkit-center;">
        <div class="col-md-4 mb-3">
          <span>Name</span>
          <input type="text" class="form-control" maxlength="25" placeholder="Name" v-model="name">
        </div>
        <div class="col-md-4 mb-3">
          <label>Card Number</label>
          <input type="text" class="form-control" maxlength="16" placeholder="Card Number" :value="cardNumber" disabled>
        </div>
        <div class="col-md-4 mb-3">
          <label>Expiry</label>
          <input type="text" class="form-control" placeholder="Expiry" :value="cardExpiry" disabled>
        </div>
        <div class="col-md-4 mb-3">
          <label>CVV</label>
          <input type="text" class="form-control" maxlength="3" placeholder="CVV" :value="cvv" disabled>
        </div>
        <div v-if="validationMessage" class="col-md-4 mb-3">
            <label style="color: red">{{validationMessage}}</label>
        </div>
      </div>
      <button class="btn btn-primary" type="Add" @click="addNewCard">Add</button>
      <button class="btn" type="Add" @click="cancelAddCard">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Card from '../components/Card.vue';
import { randomIntFromInterval, randomDate } from '@/utils/common-functions.js';
import moment from 'moment'
import cardService from '@/service/card-service.js';

@Options({
  components: {
    Card
  },
  computed: {
    cardExpiry() {
      return moment(this.expiry).format('MMMM YYYY')
    }
  },
  methods: {
    newCardClick: function () {
      this.cardNumber = String(randomIntFromInterval(1000000000000000, 9999999999999999))
      this.cvv = String(randomIntFromInterval(100, 999))
      const startDate = new Date(moment().add(12, 'M').format('YYYY-MM-DD'))
      const endDate = new Date(moment().add(60, 'M').format('YYYY-MM-DD'))
      this.expiry = randomDate(startDate, endDate)
      this.newCard = !this.newCard
    },
    cancelCard: function () {
      if (confirm('Are you sure want to cancel card')) {
        const returnVal = cardService.cancelCard(this.cards[this.activeCardIndex].cardNumber)
        if (returnVal) {
          this.$store.dispatch('cancelCard', {
            index: this.activeCardIndex
          })
          if (this.cards.length > 0) {
            if (this.activeCardIndex > 0) {
              this.activeCardIndex = this.activeCardIndex - 1
            }
            this.activeCard = this.cards[this.activeCardIndex]
          } else {
            this.activeCard = null
          }
        }
      }
    },
    toggleFreezeCard: function () {
      const card = this.cards[this.activeCardIndex]
      if (card) {
        card.freezeCard = !card.freezeCard
        const returnVal = cardService.updateCard(card)
        if (returnVal) {
          this.$store.dispatch('updateCard', {
            index: this.activeCardIndex,
            card
          })
        }
      }
    },
    addNewCard: function () {
      if (!this.name) {
        this.validationMessage = "Please enter the Name"
      } else {
        const newCard = {
          name: this.name,
          cardNumber: this.cardNumber,
          expiry: this.expiry,
          cvv: this.cvv,
          freezeCard: false,
          recentTransactions: null
        }
        const returnVal = cardService.addCard(newCard)
        if (returnVal) {
          this.$store.dispatch('addCard', newCard)
          this.clearFields()
          this.newCard = !this.newCard
  
          if (!this.activeCard) {
            this.activeCard = this.cards[this.activeCardIndex]
          }
        }
      }
    },
    cancelAddCard: function() {
      this.clearFields()
      this.newCard = !this.newCard
    },
    clearFields: function() {
      this.name = '' 
      this.cardNumber = '' 
      this.expiry = ''
      this.cvv = ''
      this.validationMessage = ''
    },
    selectCard: function (index) {
      this.activeCard = this.cards[index - 1]
      this.activeCardIndex = index - 1
    }
  }
})
export default class Cards extends Vue {
  activeCard = {}
  cards = []
  newCard = false
  name = ""
  cardNumber = ""
  expiry = ""
  cvv = ""
  activeCardIndex = 0
  validationMessage = ""

  created () {
    this.$store.dispatch('initialSet', cardService.getCards())
    this.cards = this.$store.getters.getCards
    if (this.cards && this.cards.length > 0) {
      this.activeCard = this.cards[0]
    }
  }
}
</script>
<style scoped lang="scss">
.cards {
  padding-top: 30px;
}
.card-box {
  border-radius: 8px;
  box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
    transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
  background-color: #FFFFFF;
  padding: 22px;
  margin-left: 12px;
}
.card-type {
  font-size: small;
  padding-top: 20px;
  padding-bottom: 8px;
  padding-left: 1px;
}
.my-debit-card {
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: #23CEFD;
  cursor: pointer;
}
.all-company-card {
  opacity: 0.3;
  margin-left: 20px;
}
.ranctangle {
  border-radius: 6px;
  box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
    transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
  background-color: #01D167;
  height: 10px;
  width: 10px;
  margin: 10px;
  cursor: pointer;
}
.activeCard {
  width: 20px;
}
.ranctangle-available-balance {
  border-radius: 4px;
  box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
    transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
  background-color: #01D167;
  padding: 3px;
  height: 26px;
  width: 40px;
  margin-top: 12px;
  font-weight: bold;
  color: #FFFFFF;
  font-size: 14px;
}
.available-balance-amount {
  font-weight: bolder;
  padding: 7px;
  font-size: 24px;
}
.new-card-button {
  border-radius: 4px;
  border: none;
  background-color: #325BAF;
  color: #FFFFFF;
  font-size: 12px;
  padding-right: 15px;
  height: 35px;
  margin-right: -20px;
}
.new-card-button img {
  height:18px;
  margin-bottom: 1px;
  padding: 3px;
}
</style>