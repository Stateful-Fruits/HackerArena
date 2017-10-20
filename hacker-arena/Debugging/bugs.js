PROBLEMS: description of problem
  fix: summary of fix logic;
    example: code instructions

props were not updating when redux store had already been updated
  -- fix was > apparently I was mutating the original state and returning that instead I should be 
  returning new completely new object as new store state.   -coke
      --solution -> use Object.assign({}, oldState) remember to use {}; This is one way to solve this;

problem with handling leave. Seems to be not invoking handleLeave() when it's a refresh.
  -a tag vs li tag --> a tags refresh while li tag doesn't, when App refreshes it takes a while to retrieve state from firebase and so we have null?

firebase error;
  fire.database().ref('BoardRooms' + id).remove()
     problem was that because I had no slash after BoardGames, it was not going into the 
     BoardRooms collection but instead going into 'BoardRoomsKwd0932' and making it in the database
     then removing that, which to firebase is a valid process, so it thinks nothing went wrong.
     Which is why it was throwing on errors either.

BoardRoom error-
  randomly crashes when rolling dice;
  randomly splits into two rooms;

Refreshing the page will lose state and user will be removed from state info by handleLeave;
  componentDidMount only runs once when the App hasn't finished pulling data from firebase. 
  When the store is updated by App's listeners it doesn't rerender because componentDidMount 
  doesn't behave that way. 
  -- use componentWillUpdate

One page will get the Dice component while the other one doesn't. 
  normal components like <div> seem to work but not jsx components;
  moving it down an if statement seems to work;
  -close incognito tab and reopen hit;

