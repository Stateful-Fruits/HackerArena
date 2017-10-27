const updatePendingEvents = (events = [], action) => {
  switch (action.type) {
    case 'UPDATE_PENDING_EVENTS':
      return action.payload;
    default:
      return events;
  }
}

export default updatePendingEvents;