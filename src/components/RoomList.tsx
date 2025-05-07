import RoomSubItem from "./RoomSubItem"
import RoomItem from "./RoomItem"
export interface RoomTreeProps{
    rooms:Room[],
    addRoom: (roomName:string)=>void,
    addSubItem: (roomId:string, subItem:string)=>void,
    deleteSubItem: (roomId:string, subItemId:string)=>void,
    deleteRoom: (roomId:string)=>void,
    changeSubItem: (newName: string, roomId: string, itemId: string)=>void,
    changeRoomName: (newName: string, roomId: string)=>void

}

export class Room {
    guid!:string
    name!: string
    subItems!:RoomItemEntry[]
}

export class RoomItemEntry{
    guid!:string
    name!:string
}

export default function RoomList({rooms, addRoom, addSubItem, deleteSubItem, deleteRoom, changeSubItem, changeRoomName} :RoomTreeProps){

    const saveSubItem =(newName: string, roomId: string, itemId: string)=>{
        changeSubItem(newName, roomId, itemId)
    }

    const saveRoom = (newName: string, roomId: string)=>{
        changeRoomName(newName, roomId)
    }

    return(
        <>
        <ul>
            {rooms.map(room=>(
                <li key={room.name}>
                    <div><RoomItem itemName={room.name} roomId={room.guid} saveChange={saveRoom}></RoomItem> <button onClick={()=>deleteRoom(room.guid)}>-</button></div>
                    <ul>
                        {room.subItems.map(subItem=>(<li key={subItem.name}><RoomSubItem itemName={subItem.name} roomId={room.guid} itemId={subItem.guid} saveChange={saveSubItem}></RoomSubItem><button onClick={()=>deleteSubItem(room.guid, subItem.guid)}>-</button></li>))}
                        <li><button onClick={()=>addSubItem(room.guid, "newSubItem")}>+</button></li>
                    </ul>
                </li>
            ))}
            <li><button onClick={()=>addRoom("newRoom")}>+</button></li>
        </ul>
        </>
    )
}

/*
{rooms:[
    {
        name:"exampleName",
        subItems:[
            {
                name:"exampleSubItemName"
            },
            {
                name:"exampleSubItemName2"
            }
        ]
    }

]}
*/