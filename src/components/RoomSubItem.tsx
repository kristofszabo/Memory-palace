import SaveableTextEdit from "./SaveableTextedit"
import { useState } from "react"

interface RoomSubItemProps {
    saveChange: (newName: string,roomId: string, itemId: string)=> void,
    itemName: string,
    roomId: string,
    itemId: string,
}

export default function RoomSubItem({saveChange, itemName, roomId, itemId}: RoomSubItemProps){
    const [isUnderEdit, setIsUnderEdit] = useState(false)

    const handleSave = (newVal: string)=>{
        saveChange(newVal, roomId, itemId);
        setIsUnderEdit(false);
    }

    return <>
        {isUnderEdit ?
            <SaveableTextEdit saveMethod={handleSave} startingText={itemName} onCancel={()=>setIsUnderEdit(false)}></SaveableTextEdit>
            : <>{itemName} <button onClick={()=>setIsUnderEdit(true)}>Edit</button></>}
        
    </>
}
