<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <section class="container">
    <div class="row">


      <div v-for="t in tickets" :key="t.id" class=" col-6 card m-3">
        <div>
          {{ t.event?.name }}

          <img class="m-3 rounded" :src="t.event?.coverImg" />

          <button class="btn btn-danger m-2" @click="removeTicket(t.id)">Delete</button>
          <!-- {{ t.event?.description }} -->
        </div>




      </div>
    </div>
  </section>

</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from '../services/TicketsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import TicketCard from '../components/TicketCard.vue'
import { useRoute } from 'vue-router'
export default {
  name: "Account",
  setup() {
    const route = useRoute()

    async function getAccountTickets() {
      try {
        await ticketsService.getTicketEventsByAccount(route.params.accountId);
      }
      catch (error) {
        logger.error("[get tickets on account]", error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getAccountTickets();
    });
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.ticketEvent),


      async removeTicket(ticketId) {
        try {
          await ticketsService.removeTicket(ticketId)
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
  components: { TicketCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
