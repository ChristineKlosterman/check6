<template>
    <div class="container">
        <form @submit.prevent="handleSubmit" class="row bg-white p-4 elevation-2">
            <div class="col-12">Create Event</div>
            <div class="">
                <label for="name" class="form-label text-dark">Name</label>
                <input type="text" v-model="editable.name" class="form-control" name="name" id="name">
            </div>
            <div class="">
                <label for="cover-image" class="form-label">Cover Image</label>
                <input type="url" v-model="editable.coverImg" class="form-control img-fluid" name="coverImg" id="title"
                    aria-describedby="helpId" placeholder="">
            </div>
            <div>
                <label for="location" class="form-label">Location</label>
                <input type="text" v-model="editable.location" class="form-control">
            </div>
            <div>
                <label for="capacity" class="form-label">Capacity</label>
                <input type="number" class="form-control" v-model="editable.capacity">
            </div>
            <div>
                <label for="start-date" class="form-label">Start Date:</label>
                <input type="date" class="form-control" v-model="editable.startDate">
            </div>
            <div class="">
                <label for="type" class="type form-label ">Type</label>
                <select v-model="editable.type" name="" id="" class="form-control">
                    <option value="concert">concert</option>
                    <option value="convention">convention</option>
                    <option value="sport">Sport</option>
                    <option value="digital">Digital</option>
                </select>
            </div>
            <div>
                <label for="description" class="form-label">Description</label>
                <textarea type="text" v-model="editable.description" class="form-control" name="description"
                    style="resize:none"></textarea>
            </div>
            <button class="col-6 m-3 btn btn-success">Submit</button>
        </form>
    </div>
</template>
<script>
import { ref } from 'vue';
import { eventsService } from '../services/EventsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    setup() {
        const editable = ref({})
        return {
            editable,
            async handleSubmit() {
                try {
                    logger.log('creating event', editable.value)
                    await eventsService.createEvent(editable.value)
                    Pop.toast('Event Created')
                } catch (error) {
                    logger.log('[handle Submit]', error)
                    Pop.error(error)
                }
            }
        }
    }
}


</script>
<style scoped lang="scss">
.type:hover {
    cursor: pointer;
}
</style>