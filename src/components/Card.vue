<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <div class="row show-card-number">
          <div class="d-flex justify-content-end" @click="showCardNumber = !showCardNumber">
            <img src="@/assets/showCardNumber.svg" alt="show card number">
            Show card number
          </div>
        </div>
        <div class="row">
          <div class="col-12 card" :class="{ freezed: cardDetail.freezeCard }">
            <div class="row">
              <div class="col-10"></div>
              <div class="col-2">
                <img src="@/assets/AspireLogoOnCard.svg" alt="Aspire Logo" class="aspire-logo">
              </div>
            </div>
            <div class="row">
              <div class="col-12 d-flex justify-content-start card-name">
                {{cardDetail.name}}
              </div>
            </div>
            <div class="row card-number" v-if="showCardNumber">
              <div class="col-3 d-flex justify-content-start card-number-text">{{ cardDetail.cardNumber.substring(0,4) }}</div>
              <div class="col-3 d-flex justify-content-start card-number-text">{{ cardDetail.cardNumber.substring(4,8) }}</div>
              <div class="col-3 d-flex justify-content-start card-number-text">{{ cardDetail.cardNumber.substring(8,12) }}</div>
              <div class="col-3 d-flex justify-content-start card-number-text">{{cardDetail.cardNumber.substring(12,16) }}</div>
            </div>
            <div class="row card-number" v-else>
              <div class="col-3 d-flex justify-content-start" v-for="index in 3" :key="index">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
              <div class="col-3 d-flex justify-content-start card-number-text">{{cardDetail.cardNumber.substring(12,16) }}</div>
            </div>
            <div class="row card-number">
              <div class="col-6 d-flex justify-content-start">Thru: {{cardExpiry}}</div>
              <div class="col-6 d-flex justify-content-start">CVV: <span class="card-cvv">***</span></div>                
            </div>
            <div class="row">
              <div class="col-10"></div>
              <div class="col-2">
                <img src="@/assets/VisaLogo.svg" alt="Visa Logo" class="visa-logo">
              </div>
            </div>
            <!-- <div class="row">{{cardDetail?.freezeCard ? "Freezed" : "Active"}}</div>
            <div class="row">{{cardDetail?.cancelCard ? "cancelled" : "Working"}}</div> -->
          </div>
        </div>
        <div class="row">
          <div class="d-flex justify-content-center">
            <slot />
          </div>
        </div>
        <div class="row">
          <div class="row row-cols-5 card-control">
            <div class="col" @click="$emit('toggle-freeze-card')">
              <img src="@/assets/FreezeCard.svg" alt="Visa Logo" class="control-icon">
              <label>{{cardDetail.freezeCard ? 'Un-Freeze Card' : 'Freeze Card'}}</label>
            </div>
            <div class="col">
              <img src="@/assets/SetSpendLimit.svg" alt="Visa Logo" class="control-icon">
              <label>Set Spend Limit</label>
            </div>
            <div class="col">
              <img src="@/assets/GPay.svg" alt="Visa Logo" class="control-icon">
              <label>Add to GPay</label>
            </div>
            <div class="col">
              <img src="@/assets/ReplaceCard.svg" alt="Visa Logo" class="control-icon">
              <label>Replace Card</label>
            </div>
            <div class="col" @click="$emit('cancel-card')">
              <img src="@/assets/DeactivateCard.svg" alt="Visa Logo" class="control-icon">
              <label>Cancel Card</label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6" style="padding-left: 42px">
        <div class="transactions">
          <div class="collapsible" @click="cardDetails = !cardDetails">
            <div class="row">
              <div class="col-10 d-flex justify-content-start">
                <img src="@/assets/CardDetails.svg" alt="recent transaction">
                <span>
                  Card Details
                </span>
              </div>
              <div class="col-2 d-flex justify-content-end">
                <img :class="{ rotate: !cardDetails }" src="@/assets/UpArrow.svg" alt="up-down arrow">
              </div>
            </div>            
          </div>
          <div class="row" v-if="cardDetails" style="padding: 10px;">
            <div class="col-1"></div>
            <div class="col-11 d-flex justify-content-start">
              There are no Card Details to show
            </div>
          </div>
        </div>
        <div class="transactions">
          <div class="collapsible" @click="transactionCollapse = !transactionCollapse">
            <div class="row">
              <div class="col-10 d-flex justify-content-start">
                <img src="@/assets/RecentTransaction.svg" alt="recent transaction">
                <span>
                  Recent Transactions
                </span>
              </div>
              <div class="col-2 d-flex justify-content-end">
                <img :class="{ rotate: !transactionCollapse }" src="@/assets/UpArrow.svg" alt="up-down arrow">
              </div>
            </div>            
          </div>
          <div v-if="transactionCollapse">
            <div class="row" v-if="cardDetail && !cardDetail.recentTransactions" style="padding: 10px;">
              <div class="col-1"></div>
              <div class="col-11 d-flex justify-content-start">
                There are no transaction to show
              </div>
            </div>
            <div style="padding:20px" v-else v-for="(recentTransaction, index) in cardDetail.recentTransactions.slice(0, defaultDisplayDataLength)" :key="index">
              <div class="row">
                <div class="col-2">
                  <div class="d-flex justify-content-end transaction-icon">
                    <img src="@/assets/Flight.svg" alt="recent transaction" v-if="recentTransaction.type === 'flight'">
                    <img src="@/assets/Megaphone.svg" alt="recent transaction" v-else-if="recentTransaction.type === 'announcement'">
                    <img src="@/assets/FileStorage.svg" alt="recent transaction" v-else>
                  </div>
                </div>
                <div class="col-4">
                  <div class="row">
                    <span style="font-weight: bold; color: black">{{recentTransaction.name}}</span>
                  </div>
                  <div class="row">
                    <span style="color: #AAAAAA">{{formatTransactionData(recentTransaction.date)}}</span>
                  </div>
                </div>
                <div class="col-6 d-flex justify-content-end">
                  <span style="font-weight: bold; color: black;" :class="{ credit: recentTransaction.payment === 'credit' }">{{recentTransaction.amount}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-2"></div>
                <div class="col-10 d-flex justify-content-start">
                  {{recentTransaction.remark}}
                </div>
              </div>
            </div>
            <div class="view-all-card-transaction" v-if="cardDetail && cardDetail.recentTransactions && cardDetail.recentTransactions.length > defaultDisplayDataLength">
              <span style="cursor: pointer" @click="viewAllCardTransaction">View all card transactions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import moment from 'moment'

@Options({
  props: {
    cardDetail: {}
  },
  watch: {
    cardDetail(value, oldValue) {
      if (JSON.stringify(value) !== JSON.stringify(oldValue)) {
        this.showCardNumber = false
      }
    }
  },
  computed: {
    cardExpiry() {
      return moment(this.cardDetail?.expiry).format('MM/YY')
    }
  },
  methods: {
    formatTransactionData(date) {
      return moment(date).format('DD MMM YYYY')
    },
    viewAllCardTransaction() {
      this.defaultDisplayDataLength = this.cardDetail?.recentTransactions?.length
    }
  }
})
export default class Card extends Vue {
  msg!: string
  transactionCollapse = true
  cardDetails = false
  showCardNumber = false
  defaultDisplayDataLength = 4
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
body{
  font-family: 'Nunito', sans-serif;
  padding: 50px;
}
.card{
  border-radius: 14px;
  box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
    transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
  padding: 14px 90px 18px 36px;
  background-color: #01D167;
}

.card h3{
  font-weight: 600;
}

@media(max-width: 990px){
  .card{
    margin: 20px;
  }
}

.visa-logo {
  height: 16px;
  width: 50px;
  margin-left: 5px;
}

.aspire-logo {
  height: 22px;
  margin: 5px;
  margin-bottom: 0px;
}

.card-name {
  color: #FFFFFF;
  font-weight: bold;
  font-size: x-large;
  padding: 12px;
}

.card-number {
  color: #FFFFFF;
  font-size: 12px;
  padding: 10px;
  padding-left: 0;
  letter-spacing: 1px;
}

.card-number-text {
  letter-spacing: 3px;
  font-weight: bold;
  font-size: 13px;
}

.dot {
  height: 7px;
  width: 7px;
  margin: 2px;
  margin-top: 6px;
  background-color: #FFFFFF;
  border-radius: 50%;
}

.card-cvv{
  font-size: 24px;
  letter-spacing: 3px;
  line-height: 0;
  padding: 8px;
  padding-top: 14px;
}

.freezed {
  opacity: 0.4;
}

.card-control {
  border-radius: 14px;
  box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
    transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
  padding: 14px 0px 14px 0px;
  background-color: #EDF3FF;
  margin: 0;
}

.control-icon {
  height: 30px;
  cursor: pointer;
}

.card-control label {
  color: #0C365A;
  font-size: 11px;
  cursor: pointer;
  margin-top: 7px;
}

.transactions {
  border-radius: 14px;
  box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
    transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
  background-color: #FFFFFF;
  font-size: small;
}

.transaction-icon {
  border-radius: 25px;
  box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
    transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
  background-color: rgb(224, 234, 255);
  padding: 13px;
  width: 40px;
  height: 40px;
}

.transactions img {
  height:14px;
  padding-bottom: 1px;
}

.view-all-card-transaction {
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
    transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
  padding: 10px;
  background-color: rgb(232, 252, 231);
  color: #01D167;
  font-weight: bold;
  
}

.credit {
  color: #01D167 !important
}

.collapsible {
  background-color: #F5F9FF;
  padding: 18px;
  margin-top: 25px;
  border-radius: 15px;
  cursor: pointer;
}

.collapsible img {
  height:22px;
  width:32px;
  padding-bottom: 1px;
}

.collapsible span {
  padding-left: 12px;
  padding-top: 1px;
  font-size: 14px;
}

.show-card-number {
  color: #01D167;
  font-size: x-small;
  font-weight: bold;
  padding: 5px;
  cursor: pointer;
}

.show-card-number img {
  height:16px;
  width:30px;
  padding-bottom: 1px;
}

.rotate {
  -webkit-transform: rotateX(180deg);
}
</style>
