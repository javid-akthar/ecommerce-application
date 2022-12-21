import { createSlice } from '@reduxjs/toolkit';



const initialAlbumState = { albumList : null };



const albumSlice = createSlice({
  name: 'counter',
  initialState: initialAlbumState,
  reducers: {
    updateAlbumList(state, action){
      console.log('action.payload',action.payload);
      state.albumList = action.payload
    },addAlbumList(state, action){
      console.log('action.payload',action.payload);
      state.albumList.push(action.payload);
    },updateAlbumListObj(state, action){
      let albumList = state.albumList;
      albumList.forEach((element, index) => {
        let updatedObj = action.payload;
        console.log('index.payload',index.payload);
        if(updatedObj.uniqueId == element.uniqueId){
          element.id = updatedObj.id;
          element.updatedId = updatedObj.updatedId;
          element.title = updatedObj.title;
        }
      });
    }, deleteAlbumListObj(state, action){
      let deletableUniqueId = action.payload
      console.log('dlete.payload',action.payload);
      let albumList = state.albumList;
      let deletableIndex = -1;
      albumList.map( (item, index) =>{
        if(item.uniqueId == deletableUniqueId){
          deletableIndex = index;
          console.log('deletableIndex',deletableIndex);
        }
      });
      if(deletableIndex != -1)
      albumList.splice(deletableIndex, 1);
      state.albumList = albumList;

    }
  },
});

export const albumActions = albumSlice.actions;

export default albumSlice.reducer;