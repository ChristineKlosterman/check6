<template>
    <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
        <div class="bg-light border elevation-2 rounded selectable">
            <div class="p-1">
                <img class="img-fluid rounded m-3" :src="event.coverImg" alt="">
                <h3 class="text-dark m-3">{{ event.name }}</h3>
                <h6 class="text-dark m-3">{{ event.creator.name }}</h6>
            </div>
        </div>
    </router-link>
</template>

<script>
import { router } from '../router.js';
export default {
    props: { event: { type: Object, required: true } },
    setup(props) {
        return {

        }
    }
};

</script>
<style scoped lang="scss">
</style>