import { AppState } from "../AppState"
import { router } from "../router"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService {
    async getEvents() {
        const res = await api.get('api/events')
        logger.log('get events', res.data)
        AppState.events = res.data
    }

    async getEventById(id) {
        const res = await api.get(`api/events/${id}`)
        logger.log('[getting event by id]', res.data)
        AppState.activeEvent = res.data
    }

    async createEvent(newEvent) {
        const res = await api.post('api/events', newEvent)
        logger.log('create album service', res.data)
        AppState.events.unshift(res.data)
        router.push({ name: 'Event', params: { eventId: res.data.id } })

    }

    async cancelEvent(eventId) {
        const res = await api.delete(`api/events/${eventId}`)
        logger.log('[cancel event service', res.data)
        AppState.activeEvent.isCanceled = true
    }
}

export const eventsService = new EventsService()