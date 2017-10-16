props were not updating when redux store had already been updated
  -- fix was > apparently I was mutating the original state and returning that instead I should be 
  returning new completely new object as new store state.   -coke
      --solution -> use Object.assign({}, oldState) remember to use {}; This is one way to solve this;