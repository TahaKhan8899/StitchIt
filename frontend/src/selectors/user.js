import { createSelector } from 'reselect'

const selectUserState = (state) => state.user

const selectLoggedInUserState = createSelector(
  selectUserState,
  (userState) => userState.data.loggedInUser
)

export { selectUserState, selectLoggedInUserState }
