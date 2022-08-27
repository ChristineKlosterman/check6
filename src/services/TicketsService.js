import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TicketsService {
    async createTicket(newTicket) {
        const res = await api.post('api/tickets', newTicket)
        logger.log('[create ticket service]', res.data)
        AppState.ticketAccount.push(res.data)
    }

    async getTicketAccountsByEvent(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('get ticket profiles by event', res.data)
        AppState.ticketAccount = res.data
    }

    async getTicketEventsByAccount() {
        const res = await api.get('account/tickets')
        logger.log('get tickets in account', res.data)
        AppState.ticketEvent = res.data
    }

    async removeTicket(ticketId) {
        const res = await api.delete(`api/tickets/${ticketId}`)

        // let url = `api/tickets/${ticketId}`
        // await api.delete(url)
        // AppState.ticketAccount = AppState.ticketAccount.filter(t => t.id != ticketId)
        AppState.ticketEvent = AppState.ticketEvent.filter(t => t.id != ticketId)
    }

}

export const ticketsService = new TicketsService()