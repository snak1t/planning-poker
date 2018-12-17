export const UPDATE_GAME = '[game] UPDATE_GAME';

// Sync actions
export const updateGame = game => ({
    type: UPDATE_GAME,
    payload: game,
});
