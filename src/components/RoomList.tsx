
export interface RoomTreeProps{
    rooms:Room[],
    addRoom: (roomName:string)=>void,
    addSubItem: (roomId:string, subItem:string)=>void,
    deleteSubItem: (roomId:string, subItemId:string)=>void,
    deleteRoom: (roomId:string)=>void
}

export class Room {
    guid!:string
    name!: string
    subItems!:RoomItem[]
}

export class RoomItem{
    guid!:string
    name!:string
}

export default function RoomList({rooms, addRoom, addSubItem, deleteSubItem, deleteRoom} :RoomTreeProps){
    return(
        <>
        <ul>
            {rooms.map(room=>(
                <li key={room.name}>
                    <div>{room.name} <button onClick={()=>deleteRoom(room.guid)}>-</button></div>
                    <ul>
                        {room.subItems.map(subItem=>(<li key={subItem.name}>{subItem.name} <button onClick={()=>deleteSubItem(room.guid, subItem.guid)}>-</button></li>))}
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