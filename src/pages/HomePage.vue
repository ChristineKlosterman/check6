<template>
  <div class="container">
    <div class="row">

      <div class="col-12-lg col-4-sm">
        Filter
      </div>
      <div class="col-6-lg col-4-sm">

        <div class=" btn " @click="filterTerm = ''">All</div>
        <div class="btn " @click="filterTerm = 'concert'">Concert</div>
        <div class="btn " @click="filterTerm = 'convention'">Conventions</div>
        <div class="btn " @click="filterTerm = 'sport'">Sports</div>
        <div class="btn " @click="filterTerm = 'digital'">Digital</div>
      </div>

    </div>
  </div>
  <EventForm />

  <div class="card m-2" v-for="e in events" :key="e.id">
    <EventCard :event="e" />
  </div>

</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import EventCard from '../components/EventCard.vue';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
  setup() {
    const filterTerm = ref('')
    async function getEvents() {
      try {
        await eventsService.getEvents();
      } catch (error) {
        logger.log('[get events]', error)
        Pop.error(error)
      }
    }
    onMounted(() => {
      getEvents()
    })
    return {
      filterTerm,
      events: computed(() => AppState.events.filter(e => filterTerm.value ? e.type == filterTerm.value : true)),
    }
  }
}
</script>

<style scoped lang="scss">
</style>
