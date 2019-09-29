export const getSession = store => store.session.toJS()

export const getRequests = store => store.requests.toJS()

export const getRequest = store => store.request.toJS()


export const getFilterDate = store => store.get('filterDate')

export const getFilterReceptionId = store => store.get('filterReceptionId')


// export const getTickets = store => store.tickets.toJS()

// export const getTicket = store => store.ticket.toJS()

// export const getCompanyId = store => store.session.get('companyId')

// export const getEmployeeId = store => store.session.get('userId')

// export const getIsTicketAdding = store => store.ticket.get('isAdding')

// export const getIsTicketAdded = store => store.ticket.get('added')

// export const getIsTicketAddingFailed = store => store.ticket.get('error')

// export const getIsApplicant = store => store.session.get('roles').includes('companyGuest')

// export const getCompanies = store => store.companies.toJS()

// export const getEmployees = store => store.employees.toJS()