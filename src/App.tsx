
import './App.css'
import RoomList from './components/roomlist.tsx';
import {Room, RoomItemEntry, RoomTreeProps} from './components/roomlist.tsx';
import { useState } from 'react';

function App() {
  const [rooms, setRooms] = useState<Room[]>([{guid:Math.random().toString(), name:"exampleName",subItems:[{guid: Math.random().toString(), name:"exampleSubItemName"},{guid: Math.random().toString(), name:"exampleSubItemName2"}]}])
    function addRoom(room:string){
      rooms.push({guid:Math.random().toString(),name:room, subItems:[]});
      setRooms([...rooms]);
    }

    function addSubItem(guid:string, subItem:string){
      rooms.find(room=>room.guid===guid)!.subItems.push({guid:Math.random().toString(),name:subItem});
      setRooms([...rooms])
    }

    function deleteSubItem(roomId:string, subItemId:string){
      rooms.find(room=>room.guid===roomId)!.subItems = rooms.find(room=>room.guid===roomId)!.subItems.filter(otherSubItem=>otherSubItem.guid!==subItemId);
      setRooms([...rooms])
    }

    function deleteRoom(guid:string){
      const newlist = rooms.filter(room=>room.guid!==guid);
      setRooms([...newlist])
    }

    function changeRoomName(newName: string, roomId: string){
      rooms.find(room=>room.guid===roomId)!.name = newName;
      setRooms([...rooms])
    }

    function changeSubItem(newName: string, roomId: string, itemId: string){
      rooms.find(room=>room.guid===roomId)!.subItems.find(subItem=>subItem.guid===itemId)!.name = newName;
      setRooms([...rooms])
    }
  
  return (
    <>
      <RoomList rooms={rooms} addRoom={addRoom} addSubItem={addSubItem} deleteSubItem={deleteSubItem} deleteRoom={deleteRoom} changeRoomName={changeRoomName} changeSubItem={changeSubItem}></RoomList>
    </>
  )
}

export default App
