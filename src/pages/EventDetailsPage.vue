
<template>
    <div class="p-1">
        <img class="img-fluid rounded elevation-2 d-flex m-4" :src="events.coverImg" alt="">
        <h3 class="text-dark">{{ events.name }}</h3>
        <h4>{{ events.description }}</h4>
        <h6>{{ events.location }}</h6>
        <p>{{ new Date(events.startDate) }}</p>
        <h6>{{ events.type }}, Capacity:{{ events.capacity }}</h6>
    </div>

    <div v-for="t in ticketAccount" class="col-2">
        <img class="img-fluid rounded elevation-2" :src="t.profile.picture" :title="t.profile.name">
    </div>

    <button class="m-2 btn btn-danger" @click="cancelEvent">Cancel</button>

    <button v-if="events.capacity > 0 && events.isCanceled == false && !hasTicket" class="m-2 btn btn-success text-dark"
        @click="buyTicket">Get Ticket</button>

    <div v-if="events.isCanceled">
        <h2 class="text-danger">Canceled</h2>
    </div>
    <div v-if="events.capacity <= 0">
        <h2 class="text-danger">Capacity: {{ events.capacity }}</h2>
    </div>
    <div>
        <CommentCard :comment="c" v-for="c in comments" :key="c.id" />
    </div>



</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { eventsService } from '../services/EventsService';
import { logger } from '../utils/Logger';
import { ticketsService } from '../services/TicketsService'
import Pop from '../utils/Pop';
import { commentsService } from '../services/CommentsService';



export default {
    setup() {
        const route = useRoute()
        async function getEventById() {
            try {
                await eventsService.getEventById(route.params.eventId)
            } catch (error) {
                logger.log('[get event by id]', error)
                Pop.error(error)
            }
        }

        async function getCommentsByEventId() {
            try {
                await commentsService.getCommentsByEventId(route.params.eventId)
            } catch (error) {
                logger.log('[get comments]', error)
                Pop.error(error)
            }
        }

        async function getTicketAccount() {
            try {
                await ticketsService.getTicketAccountsByEvent(route.params.eventId)
            } catch (error) {
                logger.log('[get ticket account]', error)
                Pop.error(error)
            }
        }
        onMounted(() => {
            getEventById();
            getTicketAccount();
            getCommentsByEventId();
        })
        return {
            events: computed(() => AppState.activeEvent),
            ticketAccount: computed(() => AppState.ticketAccount),
            comments: computed(() => AppState.comments),
            hasTicket: computed(() => {
                if (AppState.ticketAccount.find(t => t.accountId == AppState.account.id)) {
                    return true
                }
                return false
            }),

            async cancelEvent() {
                try {
                    await eventsService.cancelEvent(AppState.activeEvent.id)
                } catch (error) {
                    logger.log('[cancel event home]', error)
                    Pop.error(error)
                }
            },


            async buyTicket() {
                try {
                    if (AppState.activeEvent.capacity > 0) {
                        let newTicket = {
                            eventId: AppState.activeEvent.id,
                            accountId: AppState.account.id
                        }
                        logger.log('buying', newTicket)
                        await ticketsService.createTicket(newTicket)
                    }
                    else {
                        Pop.error('No capacity left')
                    }
                } catch (error) {
                    logger.log('[buy ticket]', error)
                    Pop.error(error)
                }
            }
        }
    }

}


</script>

<style scoped lang="scss">
</style>