const updatePendingEvents = (events) => {
  return ({
    type: 'UPDATE_PENDING_EVENTS',
    payload: events
  })
};

export default updatePendingEvents;